import Item from '../../models/Item.js'
import logger from '../../config/logger.js'

const createItem = async (req, res) => {
    try {
        const itemData = req.body
        const userId = req.id // from JWT token validated in middleware

        if (!userId) {
            logger.warn('Missing userId from token')
            return res.status(401).json({
                ok: false,
                msg: 'User authentication required',
            })
        }

        const uploadedImages = req.files?.map((file) => file.path).filter(Boolean) || []

        const payload = {
            ...itemData,
            userId,
            img: uploadedImages.length > 0 ? uploadedImages : undefined,
        }

        logger.info({ itemData: payload }, 'Creating new item')

        const newItem = new Item(payload)
        await newItem.save()

        logger.info({ itemId: newItem._id }, 'Item created successfully')
        res.status(201).json({ ok: true, msg: 'Item Created', item: newItem })

    } catch (error) {
        logger.error({ error: error.message, stack: error.stack }, 'Failed to create item')
        res.status(400).json({
            ok: false,
            msg: 'An error occurred while creating the item',
            error: error.message,
        })
    }
}

export default createItem
