import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import type { DataElement } from "../../types";

export const DataPieChart = ({
  data,
  title,
}: {
  data: DataElement[];
  title: string;
}) => {
  const options: Highcharts.Options = {
    title: {
      text: title,
    },
    tooltip: {
      formatter: function () {
        const percentage = this.percentage.toFixed(2);
        const header = `<b>${this.key}</b><br/>Percentage: <b>${percentage}%</b><br/><b>Films:</b> <br/>`;
        const content = this.point.options.custom?.films.join("<br/>");
        return header + content;
      },
    },
    series: [
      {
        type: "pie",
        data,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
