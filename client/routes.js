import React from 'react';

import App from './components/App.jsx';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import MainPageContainer from './containers/MainPageContainer.jsx';
import NewsContainer from './containers/NewsContainer.jsx';
import PhotosContainer from './containers/PhotosContainer.jsx';
import AllVideosContainer from './containers/AllVideosContainer.jsx';
import ProjectsContainer from './containers/ProjectsContainer.jsx';
import FractionContainer from './containers/FractionContainer.jsx';
import StructureContainer from './containers/StructureContainer.jsx';
import CharterContainer from './containers/CharterContainer.jsx';
import CodeContainer from './containers/CodeContainer.jsx';
import ContactsContainer from './containers/ContactsContainer.jsx';
import PartyHistoryContainer from './containers/PartyHistoryContainer.jsx';
import DoctrineContainer from './containers/DoctrineContainer.jsx';
import HotLineContainer from './containers/HotLineContainer.jsx';
import StaffRegionsContainer from './containers/StaffRegionsContainer.jsx';
import StaffListContainer from './containers/StaffListContainer.jsx';
import StaffReservistContainer from './containers/StaffReservistContainer.jsx';
import StaffInstructionsContainer from './containers/StaffInstructionsContainer.jsx';
import StaffCompetetionsContainer from './containers/StaffCompetetionsContainer.jsx';
import ElectionProgramContainer from './containers/ElectionProgramContainer.jsx';
import LeaderContainer from './containers/LeaderContainer.jsx';
import FractionLeadershipContainer from './containers/FractionLeadershipContainer.jsx';
import FractionBoardContainer from './containers/FractionBoardContainer.jsx';
import FractionNewsContainer from './containers/FractionNewsContainer.jsx';
import LeadershipContainer from './containers/LeadershipContainer.jsx';
import PPOContainer from './containers/PPOContainer.jsx';
import PressContainer from './containers/PressContainer.jsx';
import AntiCorruptionProgramContainer from './containers/AntiCorruptionProgramContainer.jsx';
import PurchaseContainer from './containers/PurchaseContainer.jsx';
import SiteMapContainer from './containers/SiteMapContainer.jsx';
import VacanciesContainer from './containers/VacanciesContainer.jsx';
import FinancialReportContainer from './containers/FinancialReportContainer.jsx';
import PartyCuratorsContainer from './containers/PartyCuratorsContainer.jsx';
import DeputyRequestsContainer from './containers/DeputyRequestsContainer.jsx';
import RegionsContainer from './containers/RegionsContainer.jsx';
import SingleNewsContainer from './containers/SingleNewsContainer.jsx';
import SingleArticleContainer from './containers/SingleArticleContainer.jsx';
import SingleProjectContainer from './containers/SingleProjectContainer.jsx';
import SearchContainer from './containers/SearchContainer.jsx';
import SingleVacancyContainer from './containers/SingleVacancyContainer.jsx';
import SingleStaffCompetetionContainer from './containers/SingleStaffCompetetionContainer.jsx'
import SinglePurchaseContainer from './containers/SinglePurchaseContainer.jsx';
import SinglePressReleaseContainer from './containers/SinglePressReleaseContainer.jsx';
import SingleDeputyRequestContainer from './containers/SingleDeputyRequestContainer.jsx';

import LoginContainer from './containers/moderator/LoginContainer.jsx';
import DictionaryContainer from './containers/moderator/DictionaryContainer.jsx';
import ModeratorNewsContainer from './containers/moderator/ModeratorNewsContainer.jsx';
import ModeratorArticlesContainer from './containers/moderator/ModeratorArticlesContainer.jsx';
import ModeratorPhotosContainer from './containers/moderator/ModeratorPhotosContainer.jsx';
import ModeratorVideosContainer from './containers/moderator/ModeratorVideosContainer.jsx';
import DictionaryRegionsContainer from './containers/moderator/DictionaryRegionsContainer.jsx';
import ModeratorProjectsContainer from './containers/moderator/ModeratorProjectsContainer.jsx';
import ModeratorSpeechesContainer from './containers/moderator/ModeratorSpeechesContainer.jsx';
import ModeratorQuotationsContainer from './containers/moderator/ModeratorQuotationsContainer.jsx';
import ModeratorFinancialReportsContainer from './containers/moderator/ModeratorFinancialReportsContainer.jsx';
import ModeratorVacanciesContainer from './containers/moderator/ModeratorVacanciesContainer.jsx';
import NewsPreviewContainer from './containers/moderator/NewsPreviewContainer.jsx';
import ModeratorPurchaseContainer from './containers/moderator/ModeratorPurchaseContainer.jsx';
import ModeratorPressReleasesContainer from './containers/moderator/ModeratorPressReleasesContainer.jsx';
import ModeratorDeputyRequestsContainer from './containers/moderator/ModeratorDeputyRequestsContainer.jsx';
import ModeratorPartyHistoryContainer from './containers/moderator/ModeratorPartyHistoryContainer.jsx';
import ModeratorCharterContainer from './containers/moderator/ModeratorCharterContainer.jsx';
import ModeratorPPOContainer from './containers/moderator/ModeratorPPOContainer.jsx';
import ModeratorFractionContainer from './containers/moderator/ModeratorFractionContainer.jsx';
import ModeratorFractionBoardContainer from './containers/moderator/ModeratorFractionBoardContainer.jsx';
import ModeratorFractionLeadershipContainer from './containers/moderator/ModeratorFractionLeadershipContainer.jsx';
import ModeratorPartyCuratorsContainer from './containers/moderator/ModeratorPartyCuratorsContainer.jsx';
import ModeratorCodeContainer from './containers/moderator/ModeratorCodeContainer.jsx';
import ModeratorHotLineContainer from './containers/moderator/ModeratorHotLineContainer.jsx';
import ModeratorDoctrineContainer from './containers/moderator/ModeratorDoctrineContainer.jsx';
import ModeratorElectionProgramContainer from './containers/moderator/ModeratorElectionProgramContainer.jsx';
import ModeratorAntiCorruptionProgramContainer from './containers/moderator/ModeratorAntiCorruptionProgramContainer.jsx';
import ModeratorPressContainer from './containers/moderator/ModeratorPressContainer.jsx';
import ModeratorContactsContainer from './containers/moderator/ModeratorContactsContainer.jsx';
import ModeratorCentralOfficeContainer from './containers/moderator/ModeratorCentralOfficeContainer.jsx';
import ModeratorBodiesContainer from './containers/moderator/ModeratorBodiesContainer.jsx';
import ModeratorLeadershipContainer from './containers/moderator/ModeratorLeadershipContainer.jsx';
import ModeratorMessagesContainer from './containers/moderator/ModeratorMessagesContainer.jsx';
import ModeratorImagesContainer from './containers/moderator/ModeratorImagesContainer.jsx';
import ModeratorStaffRegionsContainer from './containers/moderator/ModeratorStaffRegionsContainer.jsx';
import ModeratorStaffListContainer from './containers/moderator/ModeratorStaffListContainer.jsx';
import ModeratorStaffReservistContainer from './containers/moderator/ModeratorStaffReservistContainer.jsx';
import ModeratorStaffInstructionsContainer from './containers/moderator/ModeratorStaffInstructionsContainer.jsx';
import ModeratorStaffCompetetionsContainer from './containers/moderator/ModeratorStaffCompetetionsContainer.jsx';
import ModeratorParseNewsContainer from './containers/moderator/ModeratorParseNewsContainer.jsx';
import ModeratorUsersContainer from './containers/moderator/ModeratorUsersContainer.jsx';
import ModeratorLogsContainer from './containers/moderator/ModeratorLogsContainer.jsx';

import NotFound from './components/stateless/NotFound.jsx';

export const renderRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={MainPageContainer} />
    <Route path="news" component={NewsContainer} />
    <Route path="photos" component={PhotosContainer} />
    <Route path="all-videos" component={AllVideosContainer} />
    <Route path="projects" component={ProjectsContainer} />
    <Route path="fraction" component={FractionContainer} />
    <Route path="structure" component={StructureContainer} />
    <Route path="charter" component={CharterContainer} />
    <Route path="code" component={CodeContainer} />
    <Route path="contacts" component={ContactsContainer} />
    <Route path="party-history" component={PartyHistoryContainer} />
    <Route path="doctrine" component={DoctrineContainer} />
    <Route path="hot-line" component={HotLineContainer} />
    <Route path="staff-regions" component={StaffRegionsContainer} />
    <Route path="staff-list" component={StaffListContainer} />
    <Route path="staff-reservist" component={StaffReservistContainer} />
    <Route path="staff-instructions" component={StaffInstructionsContainer} />
    <Route path="staff-competetions" component={StaffCompetetionsContainer} />
    <Route path="election-program" component={ElectionProgramContainer} />
    <Route path="leader" component={LeaderContainer} />
    <Route path="fraction-leadership" component={FractionLeadershipContainer} />
    <Route path="fraction-board" component={FractionBoardContainer} />
    <Route path="fraction-news" component={FractionNewsContainer} />
    <Route path="leadership" component={LeadershipContainer} />
    <Route path="ppo" component={PPOContainer} />
    <Route path="press" component={PressContainer} />
    <Route path="anti-corruption-program" component={AntiCorruptionProgramContainer} />
    <Route path="purchase" component={PurchaseContainer} />
    <Route path="site-map" component={SiteMapContainer} />
    <Route path="vacancies" component={VacanciesContainer} />
    <Route path="financial-report" component={FinancialReportContainer} />
    <Route path="party-curators" component={PartyCuratorsContainer} />
    <Route path="deputy-requests" component={DeputyRequestsContainer} />
    <Route path="regions" component={RegionsContainer} />
    <Route path="single-news" component={SingleNewsContainer} />
    <Route path="single-article" component={SingleArticleContainer} />
    <Route path="single-project" component={SingleProjectContainer} />
    <Route path="news-preview" component={NewsPreviewContainer} />
    <Route path="search" component={SearchContainer} />
    <Route path="single-staff-competetion" component={SingleStaffCompetetionContainer} />
    <Route path="single-vacancy" component={SingleVacancyContainer} />
    <Route path="single-purchase" component={SinglePurchaseContainer} />
    <Route path="single-press-release" component={SinglePressReleaseContainer} />
    <Route path="single-deputy-request" component={SingleDeputyRequestContainer} />
    <Route path="login" component={LoginContainer}/>

    <Route path="moderator" component={DictionaryContainer}>
      <IndexRoute component={ModeratorNewsContainer} />
      <Route path="news" component={ModeratorNewsContainer} />
      <Route path="articles" component={ModeratorArticlesContainer} />
      <Route path="photos" component={ModeratorPhotosContainer} />
      <Route path="videos" component={ModeratorVideosContainer} />
      <Route path="regions" component={DictionaryRegionsContainer} />
      <Route path="projects" component={ModeratorProjectsContainer} />
      <Route path="speeches" component={ModeratorSpeechesContainer} />
      <Route path="quotations" component={ModeratorQuotationsContainer} />
      <Route path="financial-reports" component={ModeratorFinancialReportsContainer} />
      <Route path="party-curators" component={ModeratorPartyCuratorsContainer} />
      <Route path="vacancies" component={ModeratorVacanciesContainer} />
      <Route path="purchase" component={ModeratorPurchaseContainer} />
      <Route path="press-releases" component={ModeratorPressReleasesContainer} />
      <Route path="deputy-requests" component={ModeratorDeputyRequestsContainer} />
      <Route path="party-history" component={ModeratorPartyHistoryContainer} />
      <Route path="charter" component={ModeratorCharterContainer} />
      <Route path="ppo" component={ModeratorPPOContainer} />
      <Route path="fraction" component={ModeratorFractionContainer} />
      <Route path="fraction-board" component={ModeratorFractionBoardContainer} />
      <Route path="fraction-leadership" component={ModeratorFractionLeadershipContainer} />
      <Route path="code" component={ModeratorCodeContainer} />
      <Route path="hot-line" component={ModeratorHotLineContainer} />
      <Route path="doctrine" component={ModeratorDoctrineContainer} />
      <Route path="election" component={ModeratorElectionProgramContainer} />
      <Route path="anti-corruption" component={ModeratorAntiCorruptionProgramContainer} />
      <Route path="press" component={ModeratorPressContainer} />
      <Route path="contacts" component={ModeratorContactsContainer} />
      <Route path="central-office" component={ModeratorCentralOfficeContainer} />
      <Route path="bodies" component={ModeratorBodiesContainer} />
      <Route path="leadership" component={ModeratorLeadershipContainer} />
      <Route path="messages" component={ModeratorMessagesContainer} />
      <Route path="images" component={ModeratorImagesContainer} />
      <Route path="staff-regions" component={ModeratorStaffRegionsContainer} />
      <Route path="staff-list" component={ModeratorStaffListContainer} />
      <Route path="staff-reservist" component={ModeratorStaffReservistContainer} />
      <Route path="staff-instructions" component={ModeratorStaffInstructionsContainer} />
      <Route path="staff-competetions" component={ModeratorStaffCompetetionsContainer} />
      <Route path="parse-news" component={ModeratorParseNewsContainer} />
      <Route path="users" component={ModeratorUsersContainer} />
      <Route path="logs" component={ModeratorLogsContainer} />
    </Route>
    <Route path="kz" component={MainPageContainer}/>
    <Route path="ru" component={MainPageContainer}/>

    <Route path='*' component={NotFound} />
  </Route>
);
