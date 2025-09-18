declare module 'chai' {
  global {
    export namespace Chai {
      interface assert {
        responseText(expectedText: string): Promise<void>;
      }
    }
  }
}