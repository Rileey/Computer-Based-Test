import './checkScore.css'
import { useState, useEffect } from 'react'
import axios from 'axios'



const CheckScore = () => {

    const [score, setScore] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=> {
        const getScore = async () => {
            const { data } = await axios.get(`/score`)
            setScore(data.data)
        }
        getScore()
    }, [])

    if (score.length === 0 || score === []){
        return null
    } else {
        console.log(score)
    }

    

    return (
        <div className='score-list-container'>
            <div className="search">
                <input className="search-bar" type="search" name="" id="" placeholder="Enter Last Name or Exam Number" onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            {/* <table>
                <tr>
                    <th>Exam Number</th>
                    <th>Score / 50</th>
                </tr>
                {score.map(result=>(
                    <>
                <tr >
                    <td key={result.result_id}>{result.examnumber}</td>
                    <td>{result.score}</td>
                </tr>
                    </>
                ))}
            </table> */}
            <div className="score-list-sub">
            <div className="score-list-item">
                <span className="score-header">Last Name</span>
                <span className="score-header">Exam Number</span>
                <span className="score-header">Score</span>
                <span className="score-header">Percentage</span>
            </div>
            {score.filter(result=>{
                if (search === ''){
                    //if search input is empty
                    return result
                    //return everything
                } else if (result.lastname.toLowerCase().includes(search.toLowerCase()) || result.examnumber.toLowerCase().includes(search.toLowerCase())){
                    //if the lastname of the data includes the values in
                    return result
                }
            }).map(result=>(
                <div className="score-list-item" key={result.result_id}>
                <span className="score-item">{result.lastname}</span>
                <span className="score-item">{result.examnumber}</span>
                <span className="score-item">{result.score}</span>
                <span className="score-item">{result.percentage}%</span>
            </div>
            ))}
            
            </div>

        </div>
    )
}

export default CheckScore