import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// class App extends React.Component{
//     state={res: 'no response yet.'};

//     componentDidMount(){
//         const api = await axios.get('http://localhost:3000/api');
//         this.setState({ res: api });
//     }

//     render(){
//         return(
//             <div>
//                 {this.state.res}
//             </div>
//         );
//     }
// }

const App = () => {
    const [data, setData] = React.useState('Loading...');

    React.useEffect(() => {
        fetch("/api")
        .then((res) => res.json())
        .then((res) => setData(res.message));
    }, []);

    return(
        <div>
            {data}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));