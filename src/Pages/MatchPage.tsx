import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { AppState } from '../redux/Stores/store';

interface IMatchPageProps {
  userId: string;
}

const MatchPage: React.FunctionComponent<IMatchPageProps> = ({ userId }) => {
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/likeditems/search/${userId}`)
      .then((match) => console.log(match))
      .catch((err) => console.log(err));
  }, []);

  return <div>Совпадения</div>;
};

const mapStateToProps = (state: AppState) => ({
  userId: state.auth.user._id,
});
export default connect(mapStateToProps)(MatchPage);
