import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input';
import $ from 'jquery'
import iconImage from './icon.jpg'
import _ from 'lodash'
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');


const countryData = ["INDIA", "USA", "ITALY", "JAPAN", "CHINA"];
const selected = "";

// import emails from './mails'

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']



var CreateCountryRow = createReactClass({displayName: "CreateCountryRow",
render:function(){
  console.log("Row rendered")
  var column = _.map(this.props.itemArray, (item, index) => {
    return (<CreateCountryColumn key={index} onClick={this.handleClick} menuItem={item}></CreateCountryColumn>)
  })
  return (
    <div className="row">{column}</div>
  )
  //  this.props.itemArray.forEach(function(menuItem, index){
  //      column.push(React.createElement(createCountryColumn, {key: index, onClick: this.handleClick, menuItem: menuItem}));
  //  }, this);
  // return React.createElement("div", {className: "row"},  column);
  }
})

var CreateCountryColumn=createReactClass({displayName: "CreateCountryColumn",
	handleClick:function(e){
		this.props.onClick(e);
	},
	render: function() {
    console.log("Column rendered")
    return (
      <div className='col'>
        <img src= {iconImage} alt={this.props.menuItem.label}/>
      </div>
    )
			// var countryStr = (
			// 		React.createElement("div", {className: "col"},
			// 		React.createElement("div", "nameDiv",
			// 		React.createElement("img", {src: require('./icon.jpg')}, this.props.menuItem.label)
			// 	)));
        // return countryStr;
    }
});

var CreateCountryLayout = createReactClass({displayName: "CreateCountryLayout",
render:function(){
  console.log("Layout rendered")
  var row = _.map(this.props.itemArray, (item, index) => {
    return (<CreateCountryRow key={index} onClick={this.handleClick} menuItem={item}></CreateCountryRow>)
  })
  return (
    <div className="gridContainer">{row}</div>
  )
  // this.props.itemArray.forEach(function(menuItem, index){
  //     row.push(React.createElement(createCountryRow, {key: index, onClick: this.handleClick, menuItem: menuItem}));
  // }, this);
  // return React.createElement("div", {className: "gridContainer"},  row);
   }
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
    return <div className="row">
      <div className="col"><div className="nameDiv"><img src={require('./icon.jpg')} /><span>name</span></div></div>
      <div className="col"><div className="nameDiv"><img src={require('./icon.jpg')} /><span>name</span></div></div>
      <div className="col"><div className="nameDiv"><img src={require('./icon.jpg')} /><span>name</span></div></div>
      <div className="col"><div className="nameDiv"><img src={require('./icon.jpg')} /><span>name</span></div></div>

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
        <div className="row">
          <div className="col-4"></div>
            <div className="col-3 mainDiv">
                <div>
                  <SearchInput className="search-input" onChange={this.searchUpdated} />
                  {filteredEmails.map((email, index) => {
                    return (
                      <div key={index} className="mail" key={email.id}>
                        <div className="from">{email.user.name}</div>
                        <div className="subject">{email.subject}</div>
                      </div>
                    )
                  })}
                </div>


                <div className="gridContainer" id="scrollDes">
                  <CreateCountryLayout itemArray={countryData}></CreateCountryLayout>
                  {/* <CountryName /><CountryName /><CountryName /><CountryName />
                  <CountryName /><CountryName /><CountryName /><CountryName />
                  <CountryName /><CountryName /><CountryName /><CountryName />
                  <CountryName /><CountryName /><CountryName /><CountryName /> */}
                </div>

                <div className="btnDiv">
                  <div className="row">
                    <button label="NEW" className="col newBtn">NEW</button>
                    <button label="DELETE" className="col delBtn">DELETE</button>
                  </div>
                </div>
            </div>
          <div className="col-4"></div>
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
