---
title: Finance BI Visualization
subtitle: Interactive Client Financial Data
type: Data Visualization
layout: project
date: 2014-08-20
img: bi-visualization/finance-bi.png
thumbnail: bi-visualization/messaging.png
alt: image-alt
project-date: Summer 2014
client: Waterfall
category: portfolio
published: false
---

### Project Goal: Provide platform for company to easily access and view trends about client financial data

* Compare and contrast all clients to average for top 10 clients  based on revenue and messaging volume
* Create interactive and responsive webpage
* Access more detailed financial and sales history for individual  clients

#### Technology Architecture

![bi visualization architecture](/img/portfolio/bi-visualization/architecture.png)

#### Code Snippets

The code revolved around defining these various charts using the Google Charts API. Each chart was defined in a similar way and you could custom certain aspects such as creating a slider, defining chart titles and axises.

~~~ javascript
function handleVolumeMessagingChart(response) {
    // Called when the query response is returned.
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }

    var data = response.getDataTable();

    var dateFormatter = new google.visualization.DateFormat({ pattern: 'MMM yyyy' });
    dateFormatter.format(data, 0);

    var dataView = new google.visualization.DataView(data);
    dataView.setColumns([{calc: function(data, row) { return data.getFormattedValue(row, 0); }, type:'string'}, 1]);

    // Create dashboard
    var dashboard = new google.visualization.Dashboard(
        document.getElementById('dashboard_div'));

    // Create a range slider, passing some options
    var MonthRangeSlider = new google.visualization.ControlWrapper({
        'controlType': 'DateRangeFilter',
        'containerId': 'range_filter_div',
        'dataTable': data,
        'options': {
            'filterColumnIndex' : 0,
            'ui': {
                'format': { pattern: 'MMM yyyy' },
                'label':'Date Range',

            }
        },
    });

    var chart = new google.visualization.ChartWrapper({
        'chartType': 'LineChart',
        'containerId': 'messaging_chart',
        'dataTable': dataView,
        'options': {
            'title': "Average Messaging Volume",
            'width': 900,
            'height': 400,
            axisTitlesPosition: 'out',
            hAxis: {title: 'Month', format: 'MMM yyyy'},
            vAxis: {title: 'Messages per Month'},
        }
    })
    dashboard.bind(MonthRangeSlider, chart)
    dashboard.draw(data);
}
~~~
