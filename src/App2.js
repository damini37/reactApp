import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input';
import iconImage from './icon.jpg'
import _ from 'lodash'
var createReactClass = require('create-react-class');
var itemNo;

const countryData = ["India", "Italy", "China", "USA"];

const KEYS_TO_FILTERS = ['user.name', 'subject', 'dest.name']

var CreateCountryLayout = createReactClass({displayName: "CreateCountryLayout",
  render:function(){
      console.log("Layout rendered")
      var row = [];
      for (var i = 0; i < 16; i++) {
        row.push((<CreateCountryRow itemArray={this.props.itemArray} onClick={this.handleClick} ></CreateCountryRow>));
      }
      return (<div className="gridContainer" id="scrollDes">{row}</div>)
  }
});

var CreateCountryRow = createReactClass({displayName: "CreateCountryRow",
  render:function(){
      console.log("Row rendered")
      var column = [];
      for (var i = 0; i < 4; i++) {
        column.push((<CreateCountryColumn itemArray={this.props.itemArray} onClick={this.handleClick}></CreateCountryColumn>));
      }
      return (<div className="row">{column}</div>)
    }
})

var CreateCountryColumn=createReactClass({displayName: "CreateCountryColumn",
	handleClick:function(e){

	},
	render: function() {
    console.log("Column rendered")
    console.log(itemNo)
    itemNo++;
    var val, icon;
    if(this.props.itemArray[itemNo] != undefined) {
      val = this.props.itemArray[itemNo];
      icon = iconImage;
    } else {
      val="";
      icon="";
    }
    console.log(icon);
    var div = <div className="col">
                  <div className="nameDiv">
                    <img src= {icon}/>
                    <span>{val}</span>
                  </div>
                </div>
    return div;
    }
});

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }
  // addNewCountry:function(e){
  //
	// },
  // delCountry:function(e){
  //
	// },
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

                {itemNo=-1}
                <div id="">
                  <CreateCountryLayout itemArray={countryData}></CreateCountryLayout>
                </div>

                <div className="btnDiv">
                  <div className="row">
                    <button label="NEW" className="col newBtn" onClick={this.addNewCountry}>NEW</button>
                    <button label="DELETE" className="col delBtn" onclick={this.delCountry}>DELETE</button>
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
