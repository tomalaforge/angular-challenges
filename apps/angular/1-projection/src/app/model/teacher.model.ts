export const subject = [
  'Sciences',
  'History',
  'English',
  'Maths',
  'Sport',
] as const; //This is known as a "const assertion" => readonly tuple type, with literal strings
            //A const assertion tells the compiler to infer the narrowest* or most specific type it can for an expression

//(typeof subject) is Array<"Sciences" | "History" | "English" |...> 
//Subject is equivalent to (Array<"Sciences" | "History" | "English" |...>)[number]
//The syntax T[K] means: the type of the properties of T whose keys are of type K. 
//https://stackoverflow.com/questions/59541521/whats-the-meaning-of-typeof-arraynumber-in-typescript
export type Subject = (typeof subject)[number];

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  subject: Subject;
}
