import React, {Component} from 'react'
import $ from 'jquery';
import SearchInput, {createFilter} from 'react-search-input';
import iconImage from './icon.jpg'
import crossImage from './cross.png'
import searchIcon from './search.png'
import searchIcon2 from './searchInput.png'

import _ from 'lodash'
var createReactClass = require('create-react-class');
var itemNo=-1;

//var countryData = ["India", "Italy", "China", "USA","India1", "Italy1", "China1", "USA1"];

var countryData = [
  {name: 'India'},
  {name: 'Italy'},
  {name: 'China'},
  {name: 'USA'},
  {name: 'Japan'},
]

var CreateCountryLayout = createReactClass({displayName: "CreateCountryLayout",
  render:function(){
      console.log(this.props.itemArray);
      var row = [];
      for (var i = 0; i < 14; i++) {
        row.push((<CreateCountryRow key={`row${i}`} itemArray={this.props.itemArray} configData={this.props.configData} ></CreateCountryRow>));
      }
      return (<div className="gridContainer" id="scrollDes">{row}</div>)
  }
});

var CreateCountryRow = createReactClass({displayName: "CreateCountryRow",
  render:function(){
      var column = [];
      for (var i = 0; i < 4; i++) {
        column.push((<CreateCountryColumn key={`column${i}`} itemArray={this.props.itemArray} configData={this.props.configData}></CreateCountryColumn>));
      }
      return (<div className="row">{column}</div>)
    }
})

var CreateCountryColumn=createReactClass({displayName: "CreateCountryColumn",
	render: function() {
    itemNo++;
    var div="", focusClass="nameDiv";
    if(itemNo===0){
      focusClass+=" selected";
    }
    if(this.props.itemArray[itemNo] !== undefined) {
        div = <div className="col">
                  <div className={focusClass} onClick={this.props.configData.focusDiv}>
                    <img src= {iconImage}/>
                    <span className="nameSpan" onClick={this.props.configData.enableEditBtn}>{this.props.itemArray[itemNo].name}</span>
                    <input className="nameInput hidden"  defaultValue={this.props.itemArray[itemNo].name} onKeyPress={this.props.configData.editCountryName}></input>
                  </div>
                </div>
    } else {
        div = <div className="col">
                  <div className="nameDiv">
                    <div className="blankDiv" ></div>
                  </div>
                </div>
    }
    return div;
  }
});

class App extends Component {
  getObjData(nameKey, myArray){
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].name === nameKey) {
              return i;
          }
      }
  }
  addNewCountry(e){
    countryData.push({name:"New_country"});
    itemNo=-1;
    this.setState({ countryArr: countryData});
	}
  editCountryName(e){
    var code = e.keyCode || e.which;
    if(code === 13) {
      var oldName = $(e.target).closest(".nameDiv").find(".nameSpan").text();
      var newName = $(e.target).val();
      var index = this.getObjData(oldName, countryData);
      console.log(index);
      countryData[index].name = newName;
      itemNo=-1;
      this.setState({ countryArr: countryData});
      $(e.target).addClass("hidden");
      $(e.target).closest(".nameDiv").find(".nameSpan").removeClass("hidden");
    }
	}
  delCountry(e){
    var name=$(".selected span").text();
    var index=this.getObjData(name, countryData);
    countryData.splice(index, 1);
    itemNo=-1;
    this.setState({ countryArr: countryData});
    $(".selected").removeClass("selected");
    $(".nameDiv:first").addClass("selected");
	}
  showSearchbox(e){
    $(".searchDiv").addClass("hidden");
    $(".searchInputDiv").removeClass("hidden");
    $(".search-input input").focus();
  }
  hideSearchbox(e){
    // $(".searchInputDiv").addClass("hidden");
    // $(".searchDiv").removeClass("hidden");
  }
  searchUpdated(value){
    itemNo=-1;
    this.setState({searchTerm: value});
  }
  setFocusOnDiv(e){
    $(".selected").removeClass("selected");
    $(e.target).closest(".nameDiv").addClass("selected");
  }
  enableEditBtn(e){
    $(".nameInput").addClass("hidden");
    $(".nameSpan").removeClass("hidden");
    $(e.target).addClass("hidden");
    $(e.target).closest(".nameDiv").find(".nameInput").removeClass("hidden").focus();
  }

  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.dataObj = {
      focusDiv : this.setFocusOnDiv,
      editCountryName : this.editCountryName,
      enableEditBtn : this.enableEditBtn,
      countryListData : countryData
    }
    this.countryArr= countryData;
    this.addNewCountry = this.addNewCountry.bind(this);
    this.delCountry = this.delCountry.bind(this);
    this.editCountryName = this.editCountryName.bind(this);
    this.dataObj.editCountryName = this.dataObj.editCountryName.bind(this);
    this.hideSearchbox = this.hideSearchbox.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
  }
  render () {

    const KEYS_TO_FILTERS = ['name']
    this.filteredCountryArray = this.countryArr.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

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
                        <SearchInput className="search-input" onChange={this.searchUpdated} />
                        <img src={searchIcon2} onClick={this.hideSearchbox}/>

                      </div>
                </div>
                <div id="">
                  <CreateCountryLayout itemArray={this.filteredCountryArray} configData={this.dataObj}></CreateCountryLayout>
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
}

export default App;
