import React, { Component } from 'react';
import qs from '../../utils';

import ColumnChart from '../ColumnChart';

export default class CulumnChartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      data: null
    };
  }

  async componentDidMount() {
    try {
      const data = this.prepareData(await this.fetchData());
      const years = data ? Object.keys(data).sort() : null;
      const { year, paused } = this.getQueryParams();

      this.setState({
        data,
        years,
        year: (years || []).includes(year) ? year : (years || [])[0],
        paused: ['true', 'false'].includes(paused) ? paused === 'true' : true
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  }

  getQueryParams() {
    const {
      location: { search }
    } = this.props;
    const { paused, year } = qs(search);
    return { paused, year };
  }

  async fetchData() {
    const response = await fetch('./wild-pig-data.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  prepareData(data) {
    const records = data['PIG POPULATIONS'] || {};

    if (!Array.isArray(records)) {
      return null;
    }

    return records.reduce((map, record) => {
      const year = record.year || 'Unknown';
      map[year] = map[year] || [];
      map[year].push(record);
      return map;
    }, {});
  }

  render() {
    const { error, data, years, year, paused } = this.state;

    return (
      <div className="container">
        {error ? (
          <h1>{error}</h1>
        ) : (
          <ColumnChart
            title="PIG POPULATIONS"
            data={data}
            years={years}
            year={year}
            paused={paused}
          />
        )}
      </div>
    );
  }
}
