/**
 * Defines the structure for a Todo item.
 */
export type Todo = {
  /**
   * The ID of the user who owns the todo item.
   */
  userId: number;
  /**
   * The unique identifier for the todo item.
   */
  id: number;
  /**
   * The title or description of the todo item.
   */
  title: string;
  /**
   * Indicates whether the todo item has been completed.
   */
  completed: boolean;
};
