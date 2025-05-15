// // import { useState } from "react";

// // function Counter() {
// //   const [count, setCount] = useState(0);

// //   const handleIncrement = () => {
// //     setCount(count + 1); // ✅ setState triggers re-render
// //   };

// //   return (
// //     <div>
// //       <p>Count: {count}</p> {/* UI will now correctly update */}
// //       <button onClick={handleIncrement}>Increment</button>
// //     </div>
// //   );
// // }

// import { useRef } from "react";

// function Counter() {
//   const countRef = useRef(0);

//   const handleIncrement = () => {
//     countRef.current += 1;
//     console.log('Current count:', countRef.current);
//   };

//   return (
//     <div>
//       <p>Count: {countRef.current}</p> {/* 👈 displaying ref value directly */}
//       <button onClick={handleIncrement}>Increment</button>
//     </div>
//   );
// }

// export default Counter;

export const Kill : React.FC = () => {
    return (
        <div>
            hi
        </div>   )
}