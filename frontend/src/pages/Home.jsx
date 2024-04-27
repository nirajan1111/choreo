import api from "../api";
import { useEffect, useState } from "react";
import Note from "../components/Note"
import "../styles/Home.css"


const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        const getNote = () => {
            api.get("/api/notes/").then((res) => {
                setNotes(res.data)
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }
        getNote()

    }, [])

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if(res.status === 204){
               setNotes( notes.filter((note) => note.id !== id))
                alert("Note Deleted")
            }
        }).catch((error) => {
           alert("Error",error)
        })
    }
    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/",{title,content}).then((res) => {
            if(res.status === 201){
                
                setTitle("")
                setContent("")
                alert("Note Created")
            }
        }).catch((error) => {
            alert("Error",error)
        })
        getNote()
    }

    return (
        <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
    );

}
export default Home;