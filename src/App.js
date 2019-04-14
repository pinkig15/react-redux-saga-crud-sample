import React, { Component } from "react";
import { API_FETCH_USERS, API_SEARCH_USER } from "./constants";
import { connect } from "react-redux";

//import { Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInp: "",
      data: this.props.data || [],
      error: this.props.error
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data, error: nextProps.error }, () => {
      console.log(this.state.data);
    });
  }

  hasAnyOfWords = (words, textToSearch) => {
    const arr = words.split(" ");
    let flag = false;
    const arrL = arr.length;
    for (let i = 0; i < arrL; i++) {
      if (textToSearch.indexOf(arr[i]) >= 0) {
        flag = true;
        break;
      }
    }
    return flag;
  };

  searchHandler = e => {
    this.setState({ searchInp: e.target.value }, () => {
      //client sided search
      // console.log(this.state.searchInp, this.state.data);
      // this.hasAnyOfWords(this.state.searchInp, this.state.data);
      //search with the api
      //this.props.search(this.props.searhInp);
    });
  };

  showItem = itemLoginName => {
    return this.hasAnyOfWords(
      this.state.searchInp.toLowerCase(),
      itemLoginName.toLowerCase()
    )
      ? true
      : false;
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { data, error } = this.state;
    console.log("comp", data);
    return (
      <div className="app-container">
        <header className="App-header">
          <input
            className="search-inpbx"
            placeholder="Type to search..."
            type="text"
            name="searchInp"
            // value={this.state.searchInp}
            onChange={this.searchHandler}
          />
        </header>

        {data && data.length > 0 ? (
          <div className="people-list-container">
            <ul className="users-list">
              {data.map(
                (item, index) =>
                  this.showItem(item.login) && (
                    <li key={index}>
                      {/*<Link to={item.avatar_url}>
                    <h5>{item.login}</h5>
                    <p>{item.designation}</p>
              </Link>*/}
                      <div className="img-txt-div">
                        <img src={item.avatar_url} alt="avtar" />
                        <div className="txt-title">
                          <a href={item.html_url}>
                            {" "}
                            <span className="name">{item.login}</span>
                          </a>
                          <span>{item.id}</span>
                        </div>
                      </div>
                      <a href={item.html_url}>
                        <button>Follow</button>
                      </a>
                    </li>
                  )
              )}
            </ul>
          </div>
        ) : (
          <div className="no-result">No Result Found!</div>
        )}

        {error && (
          <p style={{ color: "red" }}>
            Something went wrong!<span>error: {error}</span>
          </p>
        )}
      </div>
    );
  }
}

App.defaultProps = {
  searchInp: ""
};

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    data: state.data,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch({ type: API_FETCH_USERS }),
    search: data => dispatch({ type: API_SEARCH_USER, data: data })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
