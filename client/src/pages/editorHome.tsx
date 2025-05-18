import React from "react";
import { Manager } from "socket.io-client";
import { useAppSelector } from "../store";
import { getUser } from "../reducers/user";
import EditorSocket from "../components/editorSocket";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/partials/Navbar";
import { getFiles } from "../reducers/fileList";


const url = import.meta.env.VITE_URL;

export default function EditorHome() {
  const user = useAppSelector(getUser);
  const FileList = useAppSelector(getFiles);
  const { id } = useParams() as { id: string };
  const filename = FileList.data.find(file => file.id == parseInt(id))?.name;

  const [isConnected, setIsConnected] = React.useState(false);
  // console.log("Parent rendered at:", new Date().toISOString());
  // console.log("is connected"+isConnected);
  const manager = new Manager(url, {
    autoConnect: false,
    query: { 'email': user.email, filename: filename, id: id },
  });

  const socketRef: any = React.useRef(null);



  React.useEffect(() => {
    socketRef.current = manager.socket("/");
    socketRef.current.connect();

    socketRef.current.on("connect", () => {
      const token = decodeURIComponent(document.cookie).substring(6);
      socketRef.current.emit('authenticate', { token: 'Bearer ' + token });
      setIsConnected(true); // Update state so child re-renders with socket
    });
    return () => {
      socketRef.current.disconnect();
    }
  }, []);
  const socketChild = React.useMemo(() => socketRef.current, [isConnected]);

  return (
    <div style={{ backgroundColor: '#dad7d7', height: '100%' }}>
      <Navbar name={filename ? filename : ""} />
      {isConnected ? <EditorSocket socket={socketChild} /> : <p>Connecting...</p>}
      <button>save</button>
    </div>
    // <div style={{ marginLeft: '10px' }}>
    //   <h1>Editor team</h1>
    //   
    //   <button onClick={handleClick}>message</button>
    //   <button onClick={handleClick1}>disconnect</button>
    //   <button onClick={handleClick2}>connect</button>
    // </div>

    // const sendop = {}

    // const [fileLoaded, setFileLoaded] = React.useState<boolean>(false);
    // const [filename, setFilename] = React.useState<string>('test');

    // const createFile = (name: string) => {
    //   // console.log("here");
    //   socket.emit('createFile', { fileName: name, user: user.email });
    // }


    // const handleClick = () => {
    //   socket.emit('check', { i: 'did' })

    // };

    // const handleClick1 = () => {
    //   socket.disconnect();
    // }

    // const handleClick2 = () => {
    //   socket.connect();
    // }


    // const handleChange = () => {
    //   setFileLoaded((prev) => {
    //     return !prev;
    //   })
    // };
  );
}
