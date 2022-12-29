import { dbService } from "fbase"
import { useEffect, useState } from "react"
// import { getDocs, addDoc, collection, onSnapshot } from "firebase/firestore"
import { collection, onSnapshot } from "firebase/firestore"
import Nweet from "components/Nweet"
import NweetFactory from "components/NweetFactory"


const Home = ({ userObj }) => {
    
    const [nweets, setNweets] = useState([])
    

    // const getNweets = async () => {
    //     const dbNweets = await getDocs(collection(dbService, "nweet"))
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {...document.data(), id: document.id}
    //         setNweets((prev) => [nweetObject, ...prev])
    //     })
    // }

    useEffect(() => {
        // getNweets()
        onSnapshot(collection(dbService, "nweet"), (snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
            setNweets(newArray)
        })
    }, [])



    return (
        <div className="container">
            <NweetFactory userObj={userObj}/>
            <div style={{marginTop: 30}}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home