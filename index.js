let hoomans;


const DB = {
  years: {

  },
  departments: {

  },
  course: {
    PG: 0,
    UG: 0
  }
}

const analyzer = (rollno) => {
  if (!rollno || rollno.length != 8 || isNaN(rollno[0])) {
    if (DB ?.departments ?.miscellaneous) {
      DB.departments.miscellaneous = DB.departments.miscellaneous + 1
    } else {
      DB.departments.miscellaneous = 1
    }
    if (DB ?.years ?.miscellaneous) {
      DB.years.miscellaneous = DB.years.miscellaneous + 1
    } else {
      DB.years.miscellaneous = 1
    }
    return
  }
  let year = rollno.substring(0, 2)
  let department = rollno.substring(2, 5)
  let course = rollno.substring(2, 3)
  if (course == 'M') {
    DB.course.PG = DB.course.PG + 1
  }
  if (course == 'B') {
    DB.course.UG = DB.course.UG + 1
  }
  if(course!='M' && course!='B'){
    if (DB ?.course ?.miscellaneous) {
      DB.course.miscellaneous = DB.course.miscellaneous + 1
    } else {
      DB.course.miscellaneous = 1
    }
  }
  if (DB ?.departments ?. [department]) {
    DB.departments[department] = DB.departments[department] + 1
  } else {
    DB.departments[department] = 1
  }
  if (DB ?.years ?. [year]) {
    DB.years[year] = DB.years[year] + 1
  } else {
    DB.years[year] = 1
  }

}


const removeChart = () => {
const body = document.getElementById('chartdiv')
const chart = document.getElementById('chart')
body.removeChild(chart)
const canv = document.createElement('canvas');
canv.id = 'chart';
body.appendChild(canv);
}

const deptChart = ()=>{
  const labels = Object.keys(DB.departments)

const data = {
  labels: labels,
  datasets: [{
    label: 'Students',
    data: Object.values(DB.departments),
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(231, 111, 81)',
      'rgb(255, 200, 221)'
    ],
    hoverOffset: 4
  }]
}

const config = {
  type: 'doughnut',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'department wise students data'
      }
    }
  },
}
removeChart()
const thechart = document.getElementById('chart').getContext('2d')
Chart.defaults.color = '#ffff'
Chart.defaults.borderColor = 'rgba(91, 150, 213, 0.2)'
const mychart = new Chart(thechart, config)
}

const yearChart = () => {
  const labels = Object.keys(DB.years)

  const data = {
    labels: labels,
    datasets: [{
      label: 'Students',
      data: Object.values(DB.years),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(231, 111, 81)',
        'rgb(255, 200, 221)'
      ],
      hoverOffset: 4
    }]
  }

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'year wise students data'
        }
      }
    },
  }

removeChart()
  const thechart = document.getElementById('chart').getContext('2d')
  Chart.defaults.color = '#ffff'
  Chart.defaults.borderColor = 'rgba(91, 150, 213, 0.2)'
  const mychart = new Chart(thechart, config)
}

const courseChart = () => {
  const labels = Object.keys(DB.course)

  const data = {
    labels: labels,
    datasets: [{
      label: 'Students',
      data: Object.values(DB.course),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(231, 111, 81)',
        'rgb(255, 200, 221)'
      ],
      hoverOffset: 4
    }]
  }

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'year wise students data'
        }
      }
    },
  }

  removeChart()
  const thechart = document.getElementById('chart').getContext('2d')
  Chart.defaults.color = '#ffff'
  Chart.defaults.borderColor = 'rgba(91, 150, 213, 0.2)'
  const mychart = new Chart(thechart, config)
}


const deptbtn = document.getElementById('dept')
const yearbtn = document.getElementById('year')
const coursebtn = document.getElementById('course')

const clickHandler = (e) => {
  if (e.srcElement.innerHTML == 'Department') {
    deptChart()
    yearbtn.classList.remove('selected')
    coursebtn.classList.remove('selected')
    deptbtn.classList.add('selected')
    return
  }
  if (e.srcElement.innerHTML == 'Year') {
    yearChart()
     yearbtn.classList.add('selected')
     coursebtn.classList.remove('selected')
     deptbtn.classList.remove('selected')
    return
  }
  if (e.srcElement.innerHTML == 'Course') {
    courseChart()
    yearbtn.classList.remove('selected')
    coursebtn.classList.add('selected')
    deptbtn.classList.remove('selected')
    return
  }
}

deptbtn.addEventListener('click',clickHandler)
yearbtn.addEventListener('click',clickHandler)
coursebtn.addEventListener('click',clickHandler)

const analyzeBtn = document.getElementById('analyze')
const file = document.getElementById('file')

file.addEventListener('change', (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target.result
   hoomans =  csvToArray(text)
   for (let hooman of hoomans) {
     analyzer(hooman['Last Name'])
   }
   showChart()
  }
  reader.readAsText(file)
  
})

function showChart() {
  const detail = document.getElementById('detail')
  detail.classList.add('none')
  const main = document.getElementById('main')
  main.classList.remove('none')
  deptChart()
}
  

function csvToArray(str, delimiter = ",") {

      // slice from start of text to the first \n index
      // use split to create an array from string by delimiter
      const headers = str.slice(0, str.indexOf("\n")).split(delimiter)

      // slice from \n index + 1 to the end of the text
      // use split to create an array of each csv value row
      const rows = str.slice(str.indexOf("\n") + 1).split("\n")

      // Map the rows
      // split values from each row into an array
      // use headers.reduce to create an object
      // object properties derived from headers:values
      // the object passed as an element of the array
      const arr = rows.map(function (row) {
        const values = row.split(delimiter)
        const el = headers.reduce(function (object, header, index) {
          object[header] = values[index]
          return object
        }, {})
        return el
      })

      // return the array
      return arr
    }



