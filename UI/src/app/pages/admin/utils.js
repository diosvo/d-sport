exports.formatDate = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
 
//** 
//  exports.writeCsv = function(data){
    
//    // fastcsv.write(data, { headers: true})
//             // .on("finish", function(){
//             //     console.log("Write to data.csv successfully!");
//             // })
//             // .pipe(ws);
// }
 //*/
