const { sumAllDigits, inRange, getRandomNum, isValidDate } = require('../utils/helpers')
const path = require('path')
const dayjs = require('dayjs')
const { QueryTypes } = require('sequelize')
const sequelize = require(path.resolve('db', 'sequelize.js'))
const Wishes = sequelize.models.happy_wish
// const Horoscope = sequelize.models.horoscope
const Fengshui = sequelize.models.zodiac_animal
const Customer = sequelize.models.customer

function getData(req, res) {
  const { name, phone, dob } = req

  if((!name || !phone || !dob) || !isValidDate(dob) ) return res.status(400).json({ error: 'Invalid request body' })

  if(!inRange(dayjs(`${dob}`).year(), 1989 ,2008)) return res.status(400).json({ error: 'Invalid year of birth', errorCode: 100095 }) 
  
  const tsh = { tsh_num: calcTSH(dob) }
  
  const statement = getStatement(dob)
    .then(result => result)
    .catch(err => {
      console.log(err)
      Promise.reject('statement: ', err)
    })
  
  const zodiac_sign = getSignAndElement(dob)
    .then(result => result)
    .catch(err => {
      console.log(err)
      Promise.reject('zodiac: ', err)
    })

  const fengshui = getFengshuiAnimal(dob)
    .then(result => result)
    .catch(err => {
      console.log(err)
      Promise.reject('animal: ', err)
    })

  Promise.all([statement, zodiac_sign, fengshui, tsh])
  .then(results => {
    let response = {}
    results.forEach(result => response = {...response,...result})
    
    res.json(response)
  })
  // .then( async () => {
  //   const new_customer = await Customer.create({ name, phone, dob })
  //   console.log('new customer created: ', new_customer)
  // })
  .catch(err => res.status(400).json(err))
}

function calcTSH(date) {
  let _TSH = sumAllDigits(dayjs(date).get('date')) + sumAllDigits(dayjs(date).get('month')) + sumAllDigits(dayjs(date).get('year'))
  
  while(_TSH > 11) _TSH = sumAllDigits(_TSH)

  return _TSH
}

async function getFengshuiAnimal(dateTime){
  const year = dayjs(dateTime).year()
  
  try{
    const fengshui_sign = await Fengshui.findOne({
      attributes: ['year', 'animal', 'fengshui_element'],
      where: { year }
    })

    if(fengshui_sign !== null)
      return Promise.resolve({animal_sign: fengshui_sign.animal, fengshui_element : fengshui_sign.fengshui_element, year: fengshui_sign.year })
    return Promise.reject({ result: 'Not found!', status: 404 });
  }
  catch(err) {
    console.log('get animal: ', err)
    return Promise.reject({ result: 'Unknown error occurred', status: 500 })
  }
}

async function getSignAndElement(date) {
  const dateTimeFormat = dayjs(date).format('YYYY-MM-DD')
  
  try{
    const sign = await sequelize.query(
      `SELECT zodiac_sign, horo_element 
        FROM horoscopes hs where DATE_FORMAT(:time, '%m-%d') 
        BETWEEN DATE_FORMAT(hs.start_time, '%m-%d') and DATE_FORMAT(hs.end_time, '%m-%d') 
        LIMIT 1`
      ,
      {
        replacements: { time: dateTimeFormat },
        type: QueryTypes.SELECT
      }
    );

    if(sign !== null)
      return Promise.resolve(sign[0])
    return Promise.reject({ result: 'Not found!' });
  }
  catch(err) {
    console.log('get zodiac: ', err)
    return Promise.reject({ result: 'Unknown error occurred' })
  }
}

async function getStatement(date){
  const year = dayjs(date).year()
  const _group = inRange(2021 - year, 13, 22) ? 'A' : inRange(2021 - year, 23, 30) ? 'B' : ''
  const mixGroup = _group ? `'${_group}','AB'` : "'AB'"
  
  try{
    const count = await sequelize.query(
      `SELECT COUNT(age_group) as total FROM happy_wish h2 
        WHERE h2.age_group IN (${mixGroup})`,
      { type: QueryTypes.SELECT}
    )
    
    const rows = await Wishes.findAll({
      attributes: ['statement'],
      where: { age_group: _group ? [_group, 'AB'] : ['AB'] },
    })
    
    return new Promise((resolve, reject) => {
      if (!rows.length) {
        reject({ result: 'Not found!' });
      } else {
        resolve({ statement: rows[getRandomNum(1,count[0].total)-1].statement });
      }
    })
  } catch(err){
    console.log('get statement: ', err)
    return Promise.reject({ result: 'Unknown error occurred' })
  }
}

module.exports = { getData }