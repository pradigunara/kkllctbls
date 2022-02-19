import { Breadcrumb, Col, Row } from 'antd'
import Link from 'next/link'
import _ from 'lodash'
import db from '../data/db.json'

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

            return (
              <>
                {idx > 0 && <Breadcrumb.Separator>{'>'}</Breadcrumb.Separator>}
                <Breadcrumb.Item>
                  {link ? (
                    <Link href={link}>
                      <a>{content}</a>
                    </Link>
                  ) : (
                    content
                  )}
                </Breadcrumb.Item>
              </>
            )
          })}
        </Breadcrumb>
      </Col>
    </Row>
  )
}
