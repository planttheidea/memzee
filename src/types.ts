declare namespace memzee {
  export interface Options {
    isEqual?: (object1: any, object2: any) => boolean;
    transformArgs?: (args: IArguments) => IArguments | any[];
  }

  export interface MemoizedFunction extends Function {
    clear: () => void;
    set: (keyToSet: any[], resultToSet: any) => void;
  }
}
