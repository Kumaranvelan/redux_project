import { useEffect, useState } from "react"

export const KeyboardShortcut:React.FC =() => {
    const [selectedMenu,setSelectedMenu] = useState("home");
    const [isShiftPressed,setIsShiftPressed] = useState(false);

    useEffect(()=> {
         const handleKeyDown = (e:KeyboardEvent) => {
            if(e.shiftKey) {
                setIsShiftPressed(true);
            }

            if(isShiftPressed){
                if(e.key.toLowerCase() === 'h'){
                    setSelectedMenu("home")
                }
                else  if(e.key.toLowerCase() === "p"){
                    setSelectedMenu("profile")
                }
                 else if(e.key.toLowerCase() === 's') {
                    setSelectedMenu("settings")
                } else if(e.key.toLowerCase() === 'm'){
                    setSelectedMenu("messages")
                } else if(e.key.toLowerCase() === 'c'){
                    setSelectedMenu("chat")
                }
            }
        }
            const handlekeyUp = (e:KeyboardEvent) => {
                if(e.shiftKey) {
                    setIsShiftPressed(false);
                }
            }

      
         return()=>{
         window.addEventListener("keydown",handleKeyDown);
         window.addEventListener("keyup",handlekeyUp)
         }
        })

      return (
        <>
        <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: "200px", background: "#A8A4A5", padding: "1rem" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              marginBottom: "1rem",
              fontWeight: selectedMenu === "home" ? "bold" : "normal",
              color: selectedMenu === "home" ? "red" : "#fff",
            }}
          >
            Home
          </li>
          <li
            style={{
              marginBottom: "1rem",
              fontWeight: selectedMenu === "profile" ? "bold" : "normal",
            }}
          >
            Profile
          </li>
          <li
            style={{
              marginBottom: "1rem",
              fontWeight: selectedMenu === "chat" ? "bold" : "normal",
            }}
          >
            Chat
          </li>
          <li
            style={{
              marginBottom: "1rem",
              fontWeight: selectedMenu === "messages" ? "bold" : "normal",
            }}
          >
            Messages
          </li>
          <li
            style={{
              marginBottom: "1rem",
              fontWeight: selectedMenu === "settings" ? "bold" : "normal",
            }}
          >
            Settings
          </li>
        </ul>
        {/* <p style={{ fontSize: "12px", marginTop: "2rem" }}>
          Shortcut: G + H = Home, <br /> G + P = Profile <br /> G + C = Cart{" "}
          <br /> G + U = User <br /> G + E = Employee
        </p> */}
      </aside>
      <main style={{ padding: "2rem" }}>
        <h1>{selectedMenu} Page</h1>
        <p>This is the {selectedMenu.toLowerCase()} page content.</p>
      </main>
    </div>
        </>
      )
}