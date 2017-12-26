import React, {Component} from 'react'
import $ from 'jquery';
import SearchInput, {createFilter} from 'react-search-input';
import iconImage from './icon.jpg'
import crossImage from './cross.png'
import searchIcon from './search.png'
import searchIcon2 from './searchInput.png'

import _ from 'lodash'
var createReactClass = require('create-react-class');
var FontAwesome = require('react-fontawesome');
var itemNo;
var counter=0;

var countryData = ["India", "Italy", "China", "USA","India1", "Italy1", "China1", "USA1"];

var CreateCountryLayout = createReactClass({displayName: "CreateCountryLayout",
  render:function(){
      var row = [];
      for (var i = 0; i < 14; i++) {
        row.push((<CreateCountryRow itemArray={this.props.itemArray} editFunc={this.props.editFunc} onClick={this.handleClick} ></CreateCountryRow>));
      }
      return (<div className="gridContainer" id="scrollDes">{row}</div>)
  }
});

var CreateCountryRow = createReactClass({displayName: "CreateCountryRow",
  render:function(){
      var column = [];
      for (var i = 0; i < 4; i++) {
        column.push((<CreateCountryColumn itemArray={this.props.itemArray} editFunc={this.props.editFunc} onClick={this.handleClick}></CreateCountryColumn>));
      }
      return (<div className="row">{column}</div>)
    }
})

var CreateCountryColumn=createReactClass({displayName: "CreateCountryColumn",
	handleClick:function(e){
    $(e.target).addClass("hidden");
    $(e.target).closest(".nameDiv").find(".nameInput").removeClass("hidden");
	},
  handleKeyPress:function(e){
    var code = e.keyCode || e.which;
    if(code === 13) {
      this.props.editFunc(e);
    }
  },
  setFocus:function(e){
    $(".selected").removeClass("selected");
    $(e.target).closest(".nameDiv").addClass("selected");
  },
	render: function() {
    itemNo++;
    var div="", focusClass="nameDiv";
    if(itemNo===0){
      focusClass+=" selected";
    }
    if(this.props.itemArray[itemNo] !== undefined) {
      console.log(itemNo +"==================="+ this.props.itemArray[itemNo])
        div = <div className="col">
                  <div className={focusClass} onClick={this.setFocus}>
                    <img src= {iconImage}/>
                    <span className="nameSpan" onClick={this.handleClick}>{this.props.itemArray[itemNo]}</span>
                    <input className="nameInput hidden"  defaultValue={this.props.itemArray[itemNo]} onKeyPress={this.handleKeyPress}></input>
                  </div>
                </div>
    } else {
      console.log(counter);
      counter++;
        div = <div className="col">
                  <div className="nameDiv">
                    <div className="blankDiv" >{counter}</div>
                  </div>
                </div>
    }
    return div;
    }
});

class App extends Component {
  addNewCountry(e){
    countryData.push("New_country");
    this.setState({ countryArr: countryData});
	}
  editCountryName(e){
    var oldName = $(e.target).closest(".nameDiv").find(".nameSpan").text();
    var newName = $(e.target).val();
    var index=countryData.indexOf(oldName);
    countryData.splice(index, 1, newName);
    this.setState({ countryArr: countryData});
    $(e.target).addClass("hidden");
    $(e.target).closest(".nameDiv").find(".nameSpan").removeClass("hidden");
	}
  delCountry(e){
    var name=$(".selected span").text();
    countryData.splice(countryData.indexOf(name), 1);
    this.setState({ countryArr: countryData});
    $(".selected").removeClass("selected");
    $(".nameDiv:first").addClass("selected");
	}
  showSearchbox(e){
    $(".searchDiv").addClass("hidden");
    $(".searchInputDiv").removeClass("hidden");
  }
  hideSearchbox(e){
    $(".searchInputDiv").addClass("hidden");
    $(".searchDiv").removeClass("hidden");
  }
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.countryArr= countryData;
    this.addNewCountry = this.addNewCountry.bind(this);
    this.delCountry = this.delCountry.bind(this);
    this.editCountryName = this.editCountryName.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    itemNo=-1;
  }
  render () {
    const filteredEmails = [];


    return (
      <div className="container">

        <div className="row">
          <div className="col-3"></div>
            <div className="col-4 mainDiv">
                <div className="row">
                    <div className="col-12 headerDiv">
                      <div className="hiDiv"><span>HI</span></div>
                      <div className="crossDiv">
                        <img src={crossImage}/>
                      </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 searchDiv" onClick={this.showSearchbox}>
                        <div className="searchLabel">MY ITEMS</div>
                        <img src={searchIcon} />
                    </div>
                    <div className="searchInputDiv hidden">
                        <img src={searchIcon} />



                        <SearchInput className="search-input " onChange={this.searchUpdated} />
                        {filteredEmails.map((email, index) => {
                          return (
                            <div key={index} className="mail" key={email.id}>
                              <div className="from">{email.user.name}</div>
                              <div className="subject">{email.subject}</div>
                            </div>
                          )
                        })}


                        <img src={searchIcon2} onClick={this.hideSearchbox}/>

                      </div>
                </div>
                <div id="">
                  <CreateCountryLayout itemArray={this.countryArr} editFunc={this.editCountryName}></CreateCountryLayout>
                </div>
                <div className="btnDiv">
                  <div className="row">
                    <button label="NEW" className="col newBtn" onClick={this.addNewCountry}>NEW</button>
                    <button label="DELETE" className="col delBtn" onClick={this.delCountry}>DELETE</button>
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
