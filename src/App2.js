import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input';

//var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');




const countryData = ["INDIA", "USA", "ITALY", "JAPAN", "CHINA"];
const selected = "";


// import emails from './mails'

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']



var createCountryRow = createReactClass({displayName: "createCountryRow",
render:function(){
  var column = [];
   this.props.itemArray.forEach(function(menuItem, index){
       column.push(React.createElement(createCountryColumn, {key: index, onClick: this.handleClick, menuItem: menuItem}));
   }, this);
  return React.createElement("div", {className: "row"},  column);
  },
});

var createCountryColumn=createReactClass({displayName: "createCountryColumn",
	handleClick:function(e){
		this.props.onClick(e);
	},
	render: function() {
			var countryStr = (
					React.createElement("div", {className: "col"},
					React.createElement("div", "nameDiv",
					React.createElement("img", {src: require('./icon.jpg')}, this.props.menuItem.label)
				)));
        return countryStr;
    }
});

var createCountryLayout = createReactClass({displayName: "createCountryLayout",
render:function(){
  var row = [];
  this.props.itemArray.forEach(function(menuItem, index){
      row.push(React.createElement(createCountryRow, {key: index, onClick: this.handleClick, menuItem: menuItem}));
  }, this);
  return React.createElement("div", {className: "gridContainer"},  row);
  },
});

class CountryName extends React.Component{
  render(){
    // return React.createElement("div", {className:"row"},
    //         React.createElement("div", {className:"col"},
    //           React.createElement("img", {src:"./icon.jpg"},
    //             React.createElement("span", {className:"countryName"}, null)
    //         )
    //       )
    //     );
    // <Image src={require(ratingIconUrl)} style={styles.ratingImage} />
    return <div class="row">
      <div class="col"><div class="nameDiv"><img src={require('./icon.jpg')} /><span>name</span></div></div>
      <div class="col"><div class="nameDiv"><img src={require('./icon.jpg')} /><span>name</span></div></div>
      <div class="col"><div class="nameDiv"><img src={require('./icon.jpg')} /><span>name</span></div></div>
      <div class="col"><div class="nameDiv"><img src={require('./icon.jpg')} /><span>name</span></div></div>

    </div>;
  }

  createColumn = () => function() {
    return React.createElement("div", {className:"col"},
            React.createElement("img", {src:"./icon.jpg"},
              React.createElement("span", {className:"countryName"}, null)
            )
          );
    //return <div class="col"><img src="./icon.jpg" /><span>name</span></div>;
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  render () {
    const filteredEmails = [{email:"s",user:{name:"ashis"},subject:"454"}];//emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <div>
        <div class="row">
          <div class="col-2"></div>
            <div class="col-5 mainDiv">
                <div>
                  <SearchInput className="search-input" onChange={this.searchUpdated} />
                  {filteredEmails.map(email => {
                    return (
                      <div className="mail" key={email.id}>
                        <div className="from">{email.user.name}</div>
                        <div className="subject">{email.subject}</div>
                      </div>
                    )
                  })}
                </div>




                <div class="btnDiv">
                  <div class="row">
                    <button label="NEW" class="col newBtn">NEW</button>
                    <button label="DELETE" class="col delBtn">DELETE</button>
                  </div>
                </div>
            </div>
          <div class="col-5"></div>
        </div>
      </div>
    )
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}

export default App;



//React.render(React.createElement(createCountryLayout, {}), document.getElementsByClassName('mainDiv'));
