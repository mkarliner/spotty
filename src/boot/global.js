window.global ||= window;
console.log("GLOBAL!")
   import EventEmitter from "events";
      import { Buffer } from "buffer";

      window.Buffer = Buffer;
      // window.process = p;
      window.EventEmitter = EventEmitter;
