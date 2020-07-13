import React, {Component} from 'react';
import ReactSVG from 'react-svg';
import moment from '../../lib/moment-with-locales.min.js';

export default class MapStateless extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadmap: undefined
    };
  }

  onload(mapdom) {
    const map = $(mapdom);

    mapDocument = map.contents(),
    mapics = mapDocument.filter("#maps").children(),
    tooltips = mapDocument.filter(".tooltip");

    mapics.on('click', (e) => {
      const id = e.currentTarget.getAttribute('data-region-id');
      this.props.changeId(id);

      const currentTooltip = mapDocument.filter(`#tooltip-${e.currentTarget.getAttribute('id')}`);
      if(currentTooltip.attr('visibility') === '')
        return ;

      mapDocument.filter('.tooltip').attr('visibility', 'hidden');
      currentTooltip.attr('visibility', '');

      const currentRegion = this.props.regions.filter((region) => region._id === id)[0];
      currentTooltip.find('#party-organizations').text(currentRegion.partyOrganizationsNumber);
      currentTooltip.find('#territory-branches').text(currentRegion.territoryBranchesNumber);

      $(mapics).find('path').css('fill', '');
      $(mapics).find('text').css('fill', '');

      $(e.currentTarget).find('path').css('fill', '#06a8f9');
      $(e.currentTarget).find('text').css('fill', '#fff');
    });

    tooltips.on('click', (e) => {
      const $target = $(e.currentTarget);

      $target.attr('visibility', 'hidden');

      const mapic = $(mapics).filter(`#${$target.attr('id').split('-')[1]}`),
            text = mapic.find('text'),
            path = mapic.find('path');

      text.css('fill', '');
      path.css('fill', '');
    });

    if(this.props.lang === 'kz')
      this.localizeRegions(mapdom);
    else {
      const map = $(mapdom),
            mapDocument = map.contents(),
            tooltips = mapDocument.filter('.tooltip'),
            updatedAt = moment(this.props.regions[0].updatedAt).format('L'),
            labels = [
              "ПО СОСТОЯНИЮ НА" + " " + updatedAt,
              "ПЕРВИЧНЫХ",
              "ПАРТИЙНЫЙ",
              "ОРГАНИЗАЦИЙ",
              "ТЕРРИТОРИАЛЬНЫХ",
              "ФИЛИАЛОВ",
            ];
      
      for(let i = 0, len = tooltips.length; i < len; i++) {
        const $tooltip = $(tooltips[i]),
              $texts = $tooltip.find('text');

        for(let j = 0, lenj = $texts.length; j < lenj; j ++) {
          $($texts[j]).text(labels[j]);
        }
      }
    }
  }

  localizeRegions(mapdom) {
    const map = $(mapdom),
          mapDocument = map.contents(),
          mapics = mapDocument.filter("#maps").children(),
          tooltips = mapDocument.filter('.tooltip'),
          updatedAt = moment(this.props.regions[0].updatedAt).format('L'),
          labels = [
            updatedAt + " жағдай бойынша".toUpperCase(),
            "партия бастауыш".toUpperCase(),
            "ұйымдары".toUpperCase(),
            "",
            "аумақтық филиалдар".toUpperCase(),
            "",
          ];

    for(let i = 0, len = tooltips.length; i < len; i++) {
      const $tooltip = $(tooltips[i]),
            $texts = $tooltip.find('text');

      for(let j = 0, lenj = $texts.length; j < lenj; j ++) {
        $($texts[j]).text(labels[j]);
      }
    }

    for(let i = 0, len = mapics.length; i < len; i++) {
      const $mapic = $(mapics[i]),
            mapicId = $mapic.attr('data-region-id'),
            currentRegion = this.props.regions.filter((region) => parseInt(region._id) === parseInt(mapicId))[0],
            $texts = $mapic.find('text'),
            nameArray = currentRegion.name[this.props.lang].split(' ');

      for(let i = 0, len = $texts.length; i < len; i++) {
        $($texts[i]).text(nameArray[i]);
      }
    }
  }

  render() {
    const {regions} = this.props;

    return (
      <ReactSVG
        path="/custom/svg/map.svg"
        callback={this.onload.bind(this)}
        className="svg-map" />
    );
  }
}
