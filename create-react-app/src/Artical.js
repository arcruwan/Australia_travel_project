import React, { Component } from 'react';
import axios from 'axios';

export default class artical extends Component {
  state = { datas: [] };

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/destination/').then((res) => {
      this.setState({
        datas: res.data
      });
      console.log(res.data);
    });
  }
  render() {
    return <div></div>;
  }
}

// import React, { useEffect } from 'react';
// import axios from 'axios';

// const Article = () => {
//   const url = 'http://127.0.0.1:8000';

//   useEffect(() => {
//     init();
//   }, []);

//   const init = async () => {
//     let full_url = `${url}/api/`;

//     try {
//       let result = await axios.get(full_url);
//       console.log('result', result.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return <></>;
// };

// export default Article;
