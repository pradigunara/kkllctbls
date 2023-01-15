import { Breadcrumb, Col, Row } from 'antd'
import Link from 'next/link'
import _ from 'components/lodash'
import { Fragment } from 'react'

/**
 * crumbs element is an array of [(text), (link)] tuple
 *
 * @param crumbs
 * @returns {JSX.Element}
 * @constructor
 */
export default function Breadcrumbs({ crumbs = [] }) {
  return (
    <Row>
      <Col>
        <Breadcrumb separator="">
          <Breadcrumb.Item>Page</Breadcrumb.Item>
          <Breadcrumb.Separator>:</Breadcrumb.Separator>
          {crumbs.map((crumb, idx) => {
            const [content, link] = _.castArray(crumb)
            const item = !link ? content : (
              <Link href={link}>
                <a>{content}</a>
              </Link>
            )

            return (
              <Fragment key={idx}>
                {idx > 0 && <Breadcrumb.Separator>{'>'}</Breadcrumb.Separator>}
                <Breadcrumb.Item>{item}</Breadcrumb.Item>
              </Fragment>
            )
          })}
        </Breadcrumb>
      </Col>
    </Row>
  )
}
