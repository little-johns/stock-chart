import React from 'react';
// import axios from 'axios';
import LineChartContainer from './LineChartContainer';
import TimeFilter from './TimeFilter';
import StockInfo from './StockInfo';
import CompanyInfo from './CompanyInfo';
import TagContainer from './TagContainer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import API from './api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: null,
      stockInfo: null,
      averageStock: null,
      changePercent: null,
      selectedFilter: 'day',
      currentPrice: null
    };
  }
  

  componentDidMount() {
    const { stockId } = this.props.match ? this.props.match.params : { stockId: null };
    API.get((stockId && `/api/${stockId}`) || `/api/TSLA`)
    .then((response) => {
      response.data[0].stockInfo = {
        stockCompany: response.data[0].stockCompany,
        relatedTags: response.data[0].relatedTags,
        noOfOwners: response.data[0].noOfOwners,
        recommendationPercent: response.data[0].recommendationPercent,
      };
      response.data[0].stockData = {
        day: response.data[0].day,
        week: response.data[0].week,
        month: response.data[0].month,
        threeMonth: response.data[0].threeMonth,
        year: response.data[0].year,
        fiveYear: response.data[0].fiveYear,
      };
      delete response.data[0].stockCompany;
      delete response.data[0].relatedTags;
      delete response.data[0].noOfOwners;
      delete response.data[0].recommendationPercent;
      delete response.data[0].day;
      delete response.data[0].week;
      delete response.data[0].month;
      delete response.data[0].threeMonth;
      delete response.data[0].year;
      delete response.data[0].fiveYear;
      this.setState({
        stockInfo: response.data[0].stockInfo,
        chartData: response.data[0].stockData,
        averageStock: response.data[0].averageStock,
        changePercent: response.data[0].changePercent
      })
    })
  }

  changeSelectedFilter(e) {
    this.setState({
      selectedFilter: e.target.id
    })
  }

  changeCurrentPrice(activePoint) {
    this.setState({
      currentPrice: activePoint ? activePoint.price : null
    })
  }

  render() {
    const { chartData, stockInfo, averageStock, changePercent, selectedFilter, currentPrice } = this.state;
    return (
      <div id="stock-chart-container">
        {stockInfo && (<TagContainer tags={stockInfo.relatedTags} />)}

        {stockInfo && (
        <CompanyInfo 
          companyName={stockInfo.stockCompany} 
          noOfOwners={stockInfo.noOfOwners}
          recommendation={stockInfo.recommendationPercent} />
        )}

        {stockInfo && (
        <StockInfo 
        averageStock={averageStock}
        changePercent={changePercent}
        currentPrice={currentPrice} />)}

        {chartData && (
        <LineChartContainer 
        chart={chartData} 
        selectedChart={selectedFilter} 
        changePrice={price => this.changeCurrentPrice(price)} />
        )}

        <TimeFilter changeSelectedFilter={e => this.changeSelectedFilter(e)} />
      </div>
    );
  }
}

export default App;
