import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import HighMaps from '../Charts/HighMaps';
import LineChart from '../Charts/LineChart'

export default function Summary({ report, selectedCountryID }) {
  const [mapData, setMapData] = useState({});
  useEffect(() => {
    if (selectedCountryID) {
      import(`@highcharts/map-collection/countries/${selectedCountryID}/${selectedCountryID}-all.geo.json`).then((res) => setMapData(res));
    }
  }, [selectedCountryID])
  return (
    <div style={{marginTop: 10}}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report}></LineChart>
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData}></HighMaps>
        </Grid>
      </Grid>
    </div>
  );
}

