export let Product: {
  id: string;           // Automatically Generated when product is added
  category: "DESKTOP" | "LAPTOP" | "MONITOR" | "KEYBOARD" | "MOUSE" | "BACKPACK";
  brand: "SONNY" | "REVOLVO" | "COURSEAIR" | "P&H" | "MAK" | "LOGICHTE" | "AZES";
  model: string;        // { Random String } - { Two Random Numbers }
  name: string;         // {Brand} {Model}
  price: number;        // Integer Value
  rating: number;       // 2-decimal float value. evaluated out of 5
  sold: number;         // Integer
};
