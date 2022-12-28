import { dbService } from "fbase"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { useState } from "react"

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false)
    const [newNweet, setNewNweet] = useState(nweetObj.text)

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?")
        console.log(ok)
        if (ok) {
            console.log(nweetObj.id)
            const data = await deleteDoc(doc(dbService, "nweet", nweetObj.id))
            console.log(data)
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev)

    const onChange = (event) => {
        const {
            target: {value},
        } = event
        setNewNweet(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        await updateDoc(doc(dbService, "nweet", nweetObj.id), {text: newNweet})
        setEditing(false)
    }
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newNweet} required />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={setEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Nweet