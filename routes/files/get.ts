import { withRouteSpec } from "lib/middleware/with-winter-spec"
import { z } from "zod"

export default withRouteSpec({
  methods: ["GET"],
  queryParams: z.object({
    file_id: z.string().optional(),
    file_path: z.string().optional()
  }),
  jsonResponse: z.object({
    file: z.object({
      file_id: z.string(),
      file_path: z.string(),
      text_content: z.string()
    }).nullable()
  }),
})((req, ctx) => {
  const { file_id, file_path } = req.query
  const file = ctx.db.getFile({ file_id, file_path })
  return ctx.json({ file })
})
