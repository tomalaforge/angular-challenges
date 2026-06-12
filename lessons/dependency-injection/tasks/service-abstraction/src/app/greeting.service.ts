import { Injectable } from '@angular/core';

export abstract class GreetingService {
  abstract greet(name: string): string;
}

@Injectable()
export class FormalGreetingService extends GreetingService {
  override greet(name: string): string {
    return `Доброго дня, ${name}. Я очень рад видеть тебя сегодня.`;
  }
}

@Injectable()
export class CasualGreetingService extends GreetingService {
  override greet(name: string): string {
    return `Здарова ${name}! Чё как? 😄`;
  }
}
