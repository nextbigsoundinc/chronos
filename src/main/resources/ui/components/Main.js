import React from 'react'
import JobSummaryView from './JobSummaryView'
import JobEditor from './JobEditor'
import {observer} from 'mobx-react'

@observer
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterString: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.state.filterString = e.target.value.toLowerCase()
  }
  derp(event) {
    console.log(event)
  }
  render() {
    const jobSummaryStore = this.props.jobSummaryStore
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <JobEditor jobSummaryStore={jobSummaryStore} />
          </div>
          <div className="panel-heading">
            <input
              type="text"
              placeholder="filter (e.g. job-name, status, state)"
              size="40"
              onChange={this.handleChange}
            />
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-1 bg-success">SUCCESS</div>
              <div className="col-md-1 bg-success">{jobSummaryStore.successCount}</div>
              <div className="col-md-1 bg-danger">FAILURE</div>
              <div className="col-md-1 bg-danger">{jobSummaryStore.failureCount}</div>
              <div className="col-md-1 bg-info">FRESH</div>
              <div className="col-md-1 bg-info">{jobSummaryStore.freshCount}</div>
              <div className="col-md-1 bg-primary">RUNNING</div>
              <div className="col-md-1 bg-primary">{jobSummaryStore.runningCount}</div>
              <div className="col-md-1 bg-info">QUEUED</div>
              <div className="col-md-1 bg-info">{jobSummaryStore.queuedCount}</div>
              <div className="col-md-1 bg-success">IDLE</div>
              <div className="col-md-1 bg-success">{jobSummaryStore.idleCount}</div>
            </div>
          </div>
          <JobSummaryView jobs={this.getVisibleJobs()} />
        </div>
      </div>
    )
  }

  getVisibleJobs() {
    return this.props.jobSummaryStore.jobSummarys.filter(
      e => (
        e.name.toLowerCase().includes(this.state.filterString) ||
        e.state.toLowerCase().includes(this.state.filterString) ||
        e.status.toLowerCase().includes(this.state.filterString)
      )
    )
  }
}

Main.propTypes = {
  jobSummaryStore: React.PropTypes.object.isRequired,
}
