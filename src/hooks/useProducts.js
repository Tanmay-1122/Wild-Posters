import { useState, useEffect } from "react"
import { medusa, INDIA_REGION_ID } from "../lib/medusa"

function mapMedusaProduct(product) {
    const price = product.variants?.[0]?.calculated_price?.calculated_amount ?? 0
    return {
        id: product.id,
        slug: product.handle,
        title: product.title,
        category: product.categories?.[0]?.name ?? "",
        categorySlug: product.categories?.[0]?.handle ?? "",
        collection: product.categories?.[0]?.name ?? "",
        price,
        badge: product.metadata?.badge ?? null,
        discount: product.metadata?.discount ?? null,
        originalPrice: product.metadata?.originalPrice ?? null,
        primaryImage: product.thumbnail ?? "",
        roomImage: product.metadata?.roomImage ?? product.thumbnail ?? "",
        stock: product.metadata?.stock ?? 1,
        rating: product.metadata?.rating ?? 0,
        reviews: product.metadata?.reviews ?? 0,
        description: product.description ?? "",
    }
}

export function useProducts(filters = {}) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true)
                const params = {
                    region_id: INDIA_REGION_ID,
                    fields: "+metadata,+categories.name,+categories.handle",
                    limit: 100,
                    ...filters,
                }
                const { products: raw } = await medusa.store.product.list(params)
                setProducts(raw.map(mapMedusaProduct))
            } catch (err) {
                setError(err)
                console.error("Failed to fetch products:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [JSON.stringify(filters)])

    return { products, loading, error }
}

export function useProductBySlug(slug) {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!slug) return
        async function fetchProduct() {
            try {
                const { products } = await medusa.store.product.list({
                    region_id: INDIA_REGION_ID,
                    handle: slug,
                    fields: "+metadata,+categories.name,+categories.handle",
                })
                setProduct(products[0] ? mapMedusaProduct(products[0]) : null)
            } catch (err) {
                console.error("Failed to fetch product:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [slug])

    return { product, loading }
}