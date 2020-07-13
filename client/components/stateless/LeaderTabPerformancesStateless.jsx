import React, {Component} from 'react';
import moment from '../../lib/moment-with-locales.min.js';

export default class LeaderTabPerformancesStateless extends Component {
  componentDidMount() {
    $.getScript('/custom/js/slider/owl.carousel.min.js', () => {
      const isMulti = ($('.development.item').length > 1) ? true : false;

      $(this.cd).owlCarousel({
         loop: isMulti,
         items: 1,
         margin: 10,
         nav: true,
         pagination: true,
         navText: ["<", ">"]
     });
    });
  }

  render() {
    const {performances, lang, setActiveMaterial} = this.props;
    let {activePerformance} = this.props;

    if(!activePerformance)
      activePerformance = performances[0];
    else {
      activePerformance = performances.filter((performance) => performance._id === activePerformance)[0];
    }

    moment.locale(lang);
    const date = moment(activePerformance.createdAt).format('LL');
    const performanceJSX = (
            <div className="cell-8">
              <div className="content-vertical-tabs">
                <h2>{activePerformance.title[lang]}</h2>
                <div
                  className="content-vertical-tabs-scroll" 
                  dangerouslySetInnerHTML={{__html: activePerformance.text[lang]}}>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          );
        performanceGroups = [];

    let performancePosition = 0;
    performances.forEach((performance, index) => {
      if(!performanceGroups[performancePosition])
        performanceGroups.push([]);

      if(performanceGroups[performancePosition].length === 6) {
        performancePosition ++;
        performanceGroups.push([]);
      }

      performanceGroups[performancePosition].push(performance);
    });

    const performanceGroupsJSX = performanceGroups.map((group, index) => {
      const performancesJSX = group.map((performance, index) => {
        return (
          <div
            key={index}
            className="vertical-tabs"
            onClick={setActiveMaterial}
            data-material-id={performance._id}
            data-material-name="activePerformance">
            {performance.title[lang]}
          </div>
        );
      });

      return (
        <div key={index} className="development item">
          {performancesJSX}
        </div>
      );
    });

    return (
      <section className="green-block-color">
        {performanceJSX}
        <div className="cell-4">
          <div ref={(cd) => {this.cd = cd;}} className="columns-developments">
            {performanceGroupsJSX}
          </div>
          <div className="clearfix" />
        </div>
        <div className="clearfix" />
      </section>
    );
  }
}
