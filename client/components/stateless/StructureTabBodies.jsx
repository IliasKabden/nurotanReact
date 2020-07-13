import React, {Component} from 'react';
import {getOffset, qs, qsa} from '../../lib/coreLib.js';

export default class StructureTabBodies extends Component {
  componentDidMount() {
    const $parentLinks = $('.parent-link');

    $parentLinks.on('click', (e) => {
      const childId = e.currentTarget.getAttribute('data-child-id'),
            $child = $('#' + childId);
      $child.toggle();
      const elemToGetBackTo = qs('[data-child-id='+childId+']'),
            elemOffset = getOffset(elemToGetBackTo);

      window.scrollTo(elemOffset.left, elemOffset.top);
    });

    for(let i = 0, len = $parentLinks.length; i < len; i++) {
      const childId = $($parentLinks[i]).attr('data-child-id'),
            $child = $('#' + childId);
      $child.hide();
    }
  }

  componentDidUpdate() {
    const $parentLinks = $('.parent-link');

    $parentLinks.on('click', (e) => {
      const childId = e.currentTarget.getAttribute('data-child-id'),
            $child = $('#' + childId);
      $child.toggle();
      const elemToGetBackTo = qs('[data-child-id='+childId+']'),
            elemOffset = getOffset(elemToGetBackTo);

      window.scrollTo(elemOffset.left, elemOffset.top);
    });

    for(let i = 0, len = $parentLinks.length; i < len; i++) {
      const childId = $($parentLinks[i]).attr('data-child-id'),
            $child = $('#' + childId);
      $child.hide();
    }
  }

  render() {
    const {lang, bodies} = this.props;

    return(
      <div className="cell-8 small-cell-12">
        <div dangerouslySetInnerHTML={{__html: bodies[lang]}}></div>
      </div>
    );
  }
}
