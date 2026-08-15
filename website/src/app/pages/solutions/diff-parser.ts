export interface DiffLine {
  type: 'context' | 'add' | 'del';
  oldNum: number | null;
  newNum: number | null;
  text: string;
  /** Syntax-highlighting tokens, attached asynchronously by diff-highlighter. */
  tokens?: { text: string; light?: string; dark?: string }[];
}

/** One visual row of a split (side-by-side) diff. */
export interface SplitRow {
  left: DiffLine | null;
  right: DiffLine | null;
}

export interface Hunk {
  /** Unchanged lines skipped between the previous hunk and this one. */
  skipped: number;
  lines: DiffLine[];
  rows: SplitRow[];
}

/**
 * Parses a GitHub unified `patch` string into hunks with both a unified line
 * list and paired split rows (deletions zipped with the additions that
 * replace them, GitHub-style).
 */
export function parsePatch(patch: string): Hunk[] {
  const hunks: Hunk[] = [];
  let oldNum = 0;
  let newNum = 0;
  let previousOldEnd = 1;
  let current: Hunk | null = null;

  for (const raw of patch.split('\n')) {
    const header = raw.match(/^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
    if (header) {
      oldNum = Number(header[1]);
      newNum = Number(header[3]);
      current = { skipped: Math.max(0, oldNum - previousOldEnd), lines: [], rows: [] };
      previousOldEnd = oldNum + Number(header[2] ?? 1);
      hunks.push(current);
      continue;
    }
    if (!current || raw.startsWith('\\')) {
      continue; // "\ No newline at end of file"
    }
    const text = raw.slice(1);
    if (raw.startsWith('+')) {
      current.lines.push({ type: 'add', oldNum: null, newNum: newNum++, text });
    } else if (raw.startsWith('-')) {
      current.lines.push({ type: 'del', oldNum: oldNum++, newNum: null, text });
    } else {
      current.lines.push({ type: 'context', oldNum: oldNum++, newNum: newNum++, text });
    }
  }

  for (const hunk of hunks) {
    hunk.rows = toSplitRows(hunk.lines);
  }
  return hunks;
}

function toSplitRows(lines: DiffLine[]): SplitRow[] {
  const rows: SplitRow[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.type === 'context') {
      rows.push({ left: line, right: line });
      i++;
      continue;
    }
    // Collect a run of deletions followed by a run of additions and zip them.
    const dels: DiffLine[] = [];
    const adds: DiffLine[] = [];
    while (i < lines.length && lines[i].type === 'del') {
      dels.push(lines[i++]);
    }
    while (i < lines.length && lines[i].type === 'add') {
      adds.push(lines[i++]);
    }
    const max = Math.max(dels.length, adds.length);
    for (let j = 0; j < max; j++) {
      rows.push({ left: dels[j] ?? null, right: adds[j] ?? null });
    }
  }
  return rows;
}
