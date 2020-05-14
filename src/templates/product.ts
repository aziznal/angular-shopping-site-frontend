export let Product: {
  id?: string;           // Automatically Generated when product is added
  category: "DESKTOP" | "LAPTOP" | "MONITOR" | "KEYBOARD" | "MOUSE" | "BACKPACK" | null;
  brand: "SONNY" | "REVOLVO" | "COURSEAIR" | "H&P" | "MAK" | "LOGICHTE" | "AZES" | null;
  model: string;        // { Random String } - { Two Random Numbers }
  name: string;         // {Brand} {Model}
  price: number;        // Integer Value
  rating: number;       // 2-decimal float value. evaluated out of 5
  sold: number;         // Integer
};
