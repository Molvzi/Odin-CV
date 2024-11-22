import { useState } from 'react'
import '../style/General.css'
import '../style/Right.css'

function General({ onInfoChange }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    })

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    // 从localStorage加载保存的数据
    useState(() => {
        const savedData = localStorage.getItem('generalInfo')
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            setFormData(parsedData)
            onInfoChange(parsedData)
        }
    }, [])

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => {
            const newDate = { ...prevData, [id]: value };
            onInfoChange(newDate);
            return newDate;
        })
        // 当用户开始输入时，清除对应字段的错误
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        // 验证姓名
        if (!formData.name.trim()) {
            newErrors.name = '請輸入姓名'
        }

        // 验证邮箱
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            newErrors.email = '請輸入電子郵件'
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = '請輸入有效的電子郵件'
        }

        // 验证手机号
        const phoneRegex = /^\d{11}$/
        if (!formData.phone.trim()) {
            newErrors.phone = '請輸入手機號碼'
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = '請輸入有效的手機號碼(11位數字)'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validateForm()) {
            // 保存到localStorage
            localStorage.setItem('generalInfo', JSON.stringify(formData))
            // 保存到左侧显示
            onInfoChange(formData)
            // 设置提交状态
            setSubmitted(true)
            // 清空输入框
            const emptyForm = {
                name: '',
                email: '',
                phone: '',
            }
            // 延迟清空输入框，让用户能看到成功提示
            setTimeout(() => {
                setFormData(emptyForm)
                setSubmitted(false)
            }, 800)
        }
    }

    const handleEdit = () => {
        const savedData = localStorage.getItem('generalInfo')
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            setFormData(parsedData)
        }
    }

    return (
        <div className="general-info">
            <div className="input-group">
                <label htmlFor="name">姓名:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="請輸入姓名:"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="input-group">
                <label htmlFor="email">電子郵件:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="請輸入電子郵件:"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
                <label htmlFor="phone">手機號碼:</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="請輸入手機號碼:"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="button-group">
                <button
                    onClick={handleSubmit}
                    className={submitted ? 'submitted' : ''}
                >
                    {submitted ? '已保存！' : '保存'}
                </button>

                <button
                    onClick={handleEdit}
                    className="edit-btn"
                >
                    編輯
                </button>
            </div>
        </div>
    )
}

export default General