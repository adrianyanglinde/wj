import React from 'react';
import { BrowserRouter, Route, Link, Switch, useRouteMatch, Reirect } from 'react-router-dom';
import Material from '@pages/pc/Material';
import InfoLayout from '@pages/pc/InfoLayout';
import BaseInfo from '@pages/pc/BaseInfo';
import IndentityInfo from '@pages/pc/IndentityInfo';
import BankInfo from '@pages/pc/BankInfo';
import Process from '@pages/pc/Process';
import Clipboard from '@pages/pc/Clipboard';
import '@sass/pc/reset.scss';
import './style.scss';

const Index: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/example/clipboard" component={Clipboard} />
                <Route
                    path="/info/:info"
                    component={() => (
                        <InfoLayout>
                            <Switch>
                                <Route path="/info/base" component={BaseInfo} />
                                <Route path="/info/indentity" component={IndentityInfo} />
                                <Route path="/info/bank" component={BankInfo} />
                                <Route path="/info/*" component={() => <p>404</p>} />
                            </Switch>
                        </InfoLayout>
                    )}
                />
                <Route path="/info" component={Material} />
                <Route
                    path="/process/:info"
                    component={() => (
                        <InfoLayout>
                            <Switch>
                                <Route path="/process/base/:id" component={BaseInfo} />
                                <Route path="/process/indentity/:id" component={IndentityInfo} />
                                <Route path="/process/bank/:id" component={BankInfo} />
                                <Route path="/process/*" component={() => <p>404</p>} />
                            </Switch>
                        </InfoLayout>
                    )}
                />
                <Route path="/process" component={Process} />
                <Route path="/refund" component={() => <p>财务退款申诉</p>} />
                <Route path="/finish" component={() => <p>退款完毕</p>} />
                <Route path="/" component={() => <p>404</p>} />
            </Switch>
        </BrowserRouter>
    );
};

export default Index;
