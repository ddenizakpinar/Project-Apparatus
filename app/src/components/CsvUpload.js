import React, { Component } from "react";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import { Button, Uploader } from "rsuite";

class CsvUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      data: [],
      file: null,
    };
  }

  // process CSV data
  processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    // prepare columns list from headers
    this.setState({
      columns: headers.map((c) => ({
        name: c,
        selector: c,
      })),
      data: list,
    });
  };

  // handle file upload
  handleFileUpload = (e) => {
    const file = e[e.length - 1].blobFile;
    console.log(file);
    this.setState({
      file: file,
    });
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      this.processData(data);
    };
    reader.readAsBinaryString(file);
  };

  render() {
    return (
      <div className="csv-upload">
        <Uploader
          draggable
          onChange={this.handleFileUpload}
          accept=".csv,.xlsx,.xls"
          type="file"
          autoUpload={false}
          multiple={false}
          fileListVisible={false}
        >
          <div>Click or Drag files to this area to upload</div>
        </Uploader>
        {this.state.data.length ? (
          <DataTable
            pagination
            highlightOnHover
            columns={this.state.columns}
            data={this.state.data}
          />
        ) : null}

        <Button
          onClick={() => this.props.onProgress()}
          disabled={!this.state.file}
          appearance="primary"
        >
          Done!
        </Button>
      </div>
    );
  }
}

export default CsvUpload;
