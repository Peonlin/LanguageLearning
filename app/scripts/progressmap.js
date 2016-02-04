(function(window, document, undefined) {
    "use strict";
    
    var chartData = [["Tour1", [
                         ["Section1-1", 1, ""],
                         ["Section1-2", 1, ""],
                         ["Section1-3", 1, ""],
                         ["Section1-4", 1, ""],
                         ["Section1-5", 1, ""],
                         ["Section1-6", 1, ""],
                         ["Section1-7", 1, ""],
                         ["Section1-8", 1, ""]], "", "#ccc"],
                     ["Tour2", [
                         ["Section2-1", 1, ""],
                         ["Section2-2", 1, ""],
                         ["Section2-3", 1, ""],
                         ["Section2-4", 1, ""],
                         ["Section2-5", 1, ""],
                         ["Section2-6", 1, ""],
                         ["Section2-7", 1, ""],
                         ["Section2-8", 1, ""]], "", "#ccc"],
                     ["Tour3", [
                         ["Section3-1", 1, ""],
                         ["Section3-2", 1, ""],
                         ["Section3-3", 1, ""],
                         ["Section3-4", 1, ""],
                         ["Section3-5", 1, ""],
                         ["Section3-6", 1, ""],
                         ["Section3-7", 1, ""],
                         ["Section3-8", 1, ""]], "", "#ccc"],
                     ["Tour4", [
                         ["Section2-4", 1, ""],
                         ["Section2-4", 1, ""],
                         ["Section2-4", 1, ""],
                         ["Section2-4", 1, ""],
                         ["Section2-4", 1, ""],
                         ["Section2-4", 1, ""],
                         ["Section2-4", 1, ""],
                         ["Section2-4", 1, ""]], "", "#ccc"],
                     ["Tour5", [
                         ["Section5-1", 1, ""],
                         ["Section5-2", 1, ""],
                         ["Section5-3", 1, ""],
                         ["Section5-4", 1, ""],
                         ["Section5-5", 1, ""],
                         ["Section5-6", 1, ""],
                         ["Section5-7", 1, ""],
                         ["Section5-8", 1, ""]], "", "#ccc"],
                     ["Tour6", [
                         ["Section6-1", 1, ""],
                         ["Section6-2", 1, ""],
                         ["Section6-3", 1, ""],
                         ["Section6-4", 1, ""],
                         ["Section6-5", 1, ""],
                         ["Section6-6", 1, ""],
                         ["Section6-7", 1, ""],
                         ["Section6-8", 1, ""]], "", "#ccc"],
                     ["Tour7", [
                         ["Section7-1", 1, ""],
                         ["Section7-2", 1, ""],
                         ["Section7-3", 1, ""],
                         ["Section7-4", 1, ""],
                         ["Section7-5", 1, ""],
                         ["Section7-6", 1, ""],
                         ["Section7-7", 1, ""],
                         ["Section7-8", 1, ""]], "", "#ccc"],
                     ["Tour8", [
                         ["Section8-1", 1, ""],
                         ["Section8-2", 1, ""],
                         ["Section8-3", 1, ""],
                         ["Section8-4", 1, ""],
                         ["Section8-5", 1, ""],
                         ["Section8-6", 1, ""],
                         ["Section8-7", 1, ""],
                         ["Section8-8", 1, ""]], "", "#ccc"],
                     ["Tour9", [
                         ["Section9-1", 1, ""],
                         ["Section9-2", 1, ""],
                         ["Section9-3", 1, ""],
                         ["Section9-4", 1, ""],
                         ["Section9-5", 1, ""],
                         ["Section9-6", 1, ""],
                         ["Section9-7", 1, ""],
                         ["Section9-8", 1, ""]], "", "#ccc"],
                     ["Tour2", [
                         ["Section2-1", 1, ""],
                         ["Section2-2", 1, ""],
                         ["Section2-3", 1, ""],
                         ["Section2-4", 1, ""],
                         ["Section2-5", 1, ""],
                         ["Section2-6", 1, ""],
                         ["Section2-7", 1, ""],
                         ["Section2-8", 1, ""]], "", "#ccc"],
                     ["Equity", [
                         ["Large Cap Equity", 15.00, ""], 
                         ["Mid Cap Equity", 10.00, ""], 
                         ["Small Cap Equity", 5.00, ""], 
                         ["Int'l Equity", 10.00, ""]], "", "#759ddf"], 
                     ["Real Estate", [
                         ["Global Public REITs", 5.00, ""], 
                         ["Private Real Estate", 10.00, ""]], "", "#f1d94b"], 
                     ["Alternatives", [
                         ["Diversified Hedge", 5.00, ""], 
                         ["Private Equity", 5.00, ""]], "", "#f1994a"], 
                     ["Cash", [
                         ["Cash", 5.00, ""]], "", "#f15f5f"]];
    // Create the ring chart:
    var ringChart = new Chart.Ring("demoChartDiv", {
          showTooltips : true,
          chartMinSize : [800, 800],
          chartMaxSize : [800, 800],
          chartData : chartData
        });
    
})(this, this.document);
