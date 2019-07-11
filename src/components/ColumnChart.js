import React, { Component, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import ProgressBar, {
  ButtonStates as ProgressBarButtonStates
} from './ProgressBar';

export default class ColumnChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: null,
      paused: true
    };
  }

  componentWillReceiveProps(props) {
    if (props.paused === false) {
      this.startAnimation(false);
    }
  }

  onProgressBarButtonClick = () => {
    this.toggleAnimation();
  };

  onProgressBarClick = value => {
    this.setState({
      year: value
    });
  };

  prepareChartData(records = []) {
    const labels = records.map(record => record.island);
    const data = records.map(record => record.pigPopulation);

    return {
      labels,
      datasets: [
        {
          label: ['Quantity'],
          backgroundColor: 'rgba(51,102,204,1)',
          borderWidth: 1,
          data
        }
      ]
    };
  }

  startAnimation(force = true) {
    const onAnimate = () => {
      const years = this.props.years || [];

      const nextYearIndex =
        years.indexOf(this.state.year || this.props.year) + 1;
      const nextYear = years[nextYearIndex >= years.length ? 0 : nextYearIndex];

      this.setState({
        year: nextYear
      });
    };

    this.progressBarAnimationTimer = clearTimeout(
      this.progressBarAnimationTimer
    );
    this.progressBarAnimationTimer = setInterval(onAnimate, 2000);

    if (force) onAnimate();

    this.setState({
      paused: false
    });
  }

  stopAnimation() {
    this.progressBarAnimationTimer = clearTimeout(
      this.progressBarAnimationTimer
    );
    this.setState({
      paused: true
    });
  }

  toggleAnimation(force = true) {
    const { paused } = this.state;
    if (paused) {
      this.startAnimation(force);
    } else {
      this.stopAnimation();
    }
  }

  render() {
    const {
      title,
      data,
      years,
      year: predefinedYear,
      paused: predefinedPaused
    } = this.props;

    const { year: localYear, paused: localPaused } = this.state;

    const year = localYear || predefinedYear;
    const paused = localPaused === undefined ? predefinedPaused : localPaused;

    const chartOpts = {
      legend: { display: false },
      scales: {
        xAxes: [
          {
            gridLines: { color: '#FFF' },
            display: true
          }
        ]
      }
    };
    const chartData = year ? this.prepareChartData((data || {})[year]) : {};

    return (
      <Fragment>
        <h1>{title}</h1>
        <Bar data={chartData} options={chartOpts} />
        <ProgressBar
          values={years}
          value={year}
          buttonState={
            paused
              ? ProgressBarButtonStates.play
              : ProgressBarButtonStates.pause
          }
          onButtonClick={this.onProgressBarButtonClick}
          onClick={this.onProgressBarClick}
        />
      </Fragment>
    );
  }
}
