import _ from "lodash";
import React, { Component } from "react";
class TableBody extends Component {
  rendercell = (d, column) => {
    if (column.content) {
      return column.content(d);
    }
    return _.get(d, column.path);
  };
  createKey = (d, column) => {
    return d._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((d) => (
          <tr key={d._id}>
            {columns.map((column) => (
              <td key={this.createKey(d, column)}>
                {this.rendercell(d, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
