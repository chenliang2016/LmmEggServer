import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';

const bodyStyle = {
    bodyStyle: {
      height: 432,
      background: '#fff',
    },
}

const Color = {
    green: '#64ea91',
    blue: '#8fc9fb',
    purple: '#d897eb',
    red: '#f69899',
    yellow: '#f8c82e',
    peach: '#f797d6',
    borderBase: '#e5e5e5',
    borderSplit: '#f4f4f4',
    grass: '#d6fbb5',
    sky: '#c1e0fc',
}

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-default-page">
        <Row gutter={24}>
          {/* {numberCards} */}
          <Col lg={18} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              {/* <Sales data={sales} /> */}
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                //   className={styles.weather}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.blue,
                  }}
                >
                  {/* <Weather
                    {...weather}
                    loading={loading.effects['dashboard/queryWeather']}
                  /> */}
                </Card>
              </Col>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                //   className={styles.quote}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.peach,
                  }}
                >
                  {/* <ScrollBar> */}
                    {/* <Quote {...quote} /> */}
                  {/* </ScrollBar> */}
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              {/* <RecentSales data={recentSales} /> */}
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              {/* <ScrollBar> */}
                {/* <Comments data={comments} /> */}
              {/* </ScrollBar> */}
            </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              {/* <Completed data={completed} /> */}
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle}>
              {/* <Browser data={browser} /> */}
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bordered={false} {...bodyStyle}>
              {/* <ScrollBar> */}
                {/* <Cpu {...cpu} /> */}
              {/* </ScrollBar> */}
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}
            >
              {/* <User {...user} avatar={avatar} username={username} /> */}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
