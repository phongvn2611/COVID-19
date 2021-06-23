import Highlight from './components/Highlight/index';
import Summary from './components/Summary/index';
import CountrySelector from './components/CountrySelector/index';
import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './apis/index';
import { sortBy } from 'lodash';
import { Typography, Container } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';
import '@fontsource/roboto'

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState('');
  const [report, setReport] = useState([]);
  useEffect(() => {
    getCountries().then(res => {
      const countries = sortBy(res.data, 'Country');
      setCountries(countries);
      setSelectedCountryID('vn');
    })
  }, [])

  const handleOnChange = (e) => {
    setSelectedCountryID(e.target.value);
  }

  useEffect(() => {
    if (selectedCountryID) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryID
      );
  
      getReportByCountry(Slug).then((res) => {
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectedCountryID]);
  
  return (
    <>
      <Container style={{marginTop: 20}}>
        <Typography variant="h2" components="h2">SỐ LIỆU COVID-19</Typography>
        <Typography>{ moment().format('LLL') }</Typography>
        <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryID}></CountrySelector>
        <Highlight report={report}></Highlight>
        <Summary report={report} selectedCountryID={selectedCountryID}></Summary>
      </Container>
    </>
  );
}

export default App;
