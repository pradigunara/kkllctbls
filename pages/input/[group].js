import _ from 'components/lodash'
import imageCompression from 'browser-image-compression'
import { useState } from 'react'
import { Form, Select, Row, Col, Upload, Button, Popconfirm } from 'antd'
import { getDB } from 'data/db'
import { GROUP_DATA } from 'data/constants'

export async function getStaticPaths() {
  const groupData = _.filter(GROUP_DATA, { disabled: false })
  const paths = _.map(groupData, g => ({ params: { group: g.code } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      db: getDB(params?.group),
      group: params?.group
    }
  }
}

const submitInput = (data) =>
  fetch('/api/input', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const resJson = await response.json()
      const message = JSON.stringify(resJson)

      if (response?.status >= 400) {
        return Promise.reject(message)
      }

      console.log('Success:', message)

      return message
    })

const deleteExisting = (data) =>
  fetch('/api/input', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const resJson = await response.json()
      const message = JSON.stringify(resJson)

      if (response?.status >= 400) {
        return Promise.reject(message)
      }

      console.log('Deleted:', message)

      return message
    })

export default function InputPage({ db, group }) {
  const [form] = Form.useForm()
  const [selectedEra, setSelectedEra] = useState()
  const [selectedSection, setSelectedSection] = useState()

  const findVariant = (era, section) =>
    _.find(db?.sections?.[era], { code: section })?.variant ?? {}

  const handleFinish = (form) => {
    const rounded =
      findVariant(form.eraCode, form.sectionCode)?.[form.name]?.rounded ?? true

    const payload = {
      ...form,
      group,
      rounded,
    }

    submitInput(payload)
      .then(alert)
      .catch(alert)
  }

  const handleDelete = (form) => {
    const payload = {
      ...form,
      group
    }

    deleteExisting(payload)
      .then(alert)
      .catch(alert)
  }

  const createOptions = (opts = []) =>
    opts.map((o) => ({ label: o.name, value: o.code }))

  const nameVariant =
    _.find(db?.sections?.[selectedEra], { code: selectedSection })?.variant ?? {}
  const nameOptions = _.keys(nameVariant).map((name) => ({
    label: name,
    value: name,
  }))

  return (
    <Row justify="center" style={{ marginTop: '5vh' }}>
      <Col span={20}>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item label="Member" name="memberCode">
            <Select
              options={createOptions(db?.members)}
              placeholder="Select Member"
              showSearch
            />
          </Form.Item>
          <Form.Item label="Era" name="eraCode">
            <Select
              options={createOptions(db?.eras)}
              placeholder="Select Era"
              showSearch
              onSelect={setSelectedEra}
            />
          </Form.Item>
          <Form.Item label="Section" name="sectionCode">
            <Select
              options={createOptions(db?.sections?.[selectedEra])}
              placeholder="Select Section"
              showSearch
              onSelect={setSelectedSection}
            />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Select
              options={nameOptions}
              placeholder="Select Name"
              showSearch
            />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <ImageUploader />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Popconfirm
              title="Delete existing item"
              description="Are you sure to delete this item?"
              onConfirm={() => handleDelete(form.getFieldsValue())}
              onCancel={_.noop}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="text" block>
                Delete Existing Item
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

const FILETYPE_EXT = {
  'image/jpeg': '.jpg',
}
const ALLOWED_FILE_TYPES = _.keys(FILETYPE_EXT)

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

function ImageUploader({ value, onChange, filenamePrefix = '', rounded }) {
  const [internalFileList, setInternalFileList] = useState(value ?? [])
  const [b64src, setB64src] = useState()

  const handleChange = async ({ fileList }) => {
    const listCopy = [...fileList]
    const lastFile = _.last(listCopy)

    if (!_.includes(ALLOWED_FILE_TYPES, lastFile?.type)) {
      return alert(`File type not allowed (must be jpg)`)
    }

    const timestamp = Date.now()
    const extension = _.get(FILETYPE_EXT, lastFile.type)
    const name = `${filenamePrefix}-${timestamp}${extension}`

    // modify the original file for compression
    const compressedBlob = await imageCompression(
      lastFile?.originFileObj ?? lastFile,
      {
        maxSizeMB: 4,
        maxWidthOrHeight: 500,
      }
    )
    const File = window?.File ? window.File : _.identity()
    const compressedFile = new File([compressedBlob], name, {
      lastModified: timestamp,
      type: compressedBlob.type,
    })

    const base64DataUrl = await toBase64(compressedFile)
    const base64 = _.last(base64DataUrl?.split('base64,'))

    const modifiedLastUpload = [
      { ...lastFile, originFileObj: compressedFile, base64 },
    ]

    setInternalFileList(modifiedLastUpload)
    setB64src(base64DataUrl)
    onChange(_.last(modifiedLastUpload)?.base64)

    return true
  }

  const handleDrop = ({ dataTransfer }) =>
    handleChange({ fileList: dataTransfer.files })

  return (
    <Row style={{ minHeight: '20vh' }} justify="space-between">
      <Col span={8}>
        <img
          src={b64src}
          style={{
            maxHeight: '20vh',
            borderRadius: rounded && '0.8em',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          }}
        />
      </Col>
      <Col span={16}>
        <Upload.Dragger
          accept="image/jpg"
          listType="text"
          defaultFileList={internalFileList}
          beforeUpload={() => false}
          onChange={handleChange}
          onDrop={handleDrop}
          maxCount={1}
          showUploadList={false}
          openFileDialogOnClick={false}
        >
          Drag to Upload Here
        </Upload.Dragger>
      </Col>
      <br />
    </Row>
  )
}
