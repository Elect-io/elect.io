import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Candidate from '../candidate/snippet';
import axios from "axios";
const Party = (props) => {
    const { id } = useParams();
    let navigate = useNavigate()
    const [state, setState] = useState({ loaded: false, politicians:[] });
    useEffect(() => {
        (async () => {
            try {
                let party = await axios.get(`/api/party/${id}`);
                setState(state => ({ ...state, ...party.data.party, loaded: true }));
                getCandidates(0);
            }
            catch(err){
                console.log(err);
                navigate('/')
            }
        })()
    }, [])
    const getCandidates = async (len) => {
        try {
            let candidates = await axios.get(`/api/politician/party/${id}/${len}`);
            setState(state => ({ ...state, politicians: candidates.data.politicians}));
        }
        catch (err) {
            console.log(err);
        }
    }
    console.log(id)
    console.log(state);
    if (state.loaded) {
        return (
            <div className="party">
                <div className="party-header">
                    <img alt={state.name} src={state.symbol} />
                    <div>
                        <h1>{state.commonName}</h1>
                        <p>{state.name}, {state.country}</p>
                    </div>
                </div>
                <p className="party-description">{state.moreDetails}</p>
                <div className="party-candidates">
                    {state.politicians.map((candidate, index) => {
                        return <Candidate partyName={state.commonName} {...candidate} />
                    })}
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

}

export default Party;