import { authService, dbService } from "fbase"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { getDocs, collection, query, where, orderBy } from "firebase/firestore"
import Nweet from "components/Nweet"
import { updateProfile } from "firebase/auth"

const Profile = ({ userObj, refreshUser }) => {
    // const [nweets, setNweets] = useState([])
    const history = useNavigate()
    const [newDisplayName, SetNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
        authService.signOut()
        history("/")
    }

    // const getMyNweets = async () => {
    //     const q = query(collection(dbService, "nweet"), where("creatorId", "==", userObj.uid))
    //     const nweets = await getDocs(q)

    //     nweets.forEach((document) => {
    //         const nweetObject = { ...document.data(), id: document.id }
    //         setNweets((prev) => [nweetObject, ...prev])
    //     })
    // }

    // useEffect(() => {
    //     getMyNweets()
    // }, [])

    const onChange = (event) => {
        const {
            target: { value },
        } = event
        SetNewDisplayName(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, {
                displayName : newDisplayName
            })
            refreshUser()
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} palceholder="Display name" value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
            {/* <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div> */}
        </>
    )
}

export default Profile