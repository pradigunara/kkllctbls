import { Row, Col } from 'antd'
import { GROUP } from 'data/constants'

export default function Footer({ group = GROUP.fromis }) {
  let footerText;

  if (group === GROUP.fromis) {
    footerText =
      <p style={{ textAlign: 'center' }}>
        Made with ♡ for fromis_9 by <a href="https://twitter.com/bucinakko">@bucinakko</a>
        <br />
        Source template by <a href="https://twitter.com/kiombocore">@kiombocore</a>
      </p>
  } else if (group === GROUP.newjeans) {
    footerText =
      <p style={{ textAlign: 'center' }}>
        made with ♡ by <a href="https://twitter.com/bucinakko">@bucinakko</a> & <a href="https://twitter.com/romsyeon_9">@romsyeon_9</a>
      </p>
  }

  return (
    <Row
      style={{
        margin: '2em',
      }}
      justify="center"
    >
      <Col span={24}>{footerText}</Col>
    </Row>
  )
}
